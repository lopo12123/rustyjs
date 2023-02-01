import { JSOption, RustyOption } from "./Option";

const _ok = Symbol('JSResult.Ok')
const _err = Symbol('JSResult.Err')

/**
 * @description rusty `Result` in Js
 * @description Do not instantiate with this class directly, use class `RustyResult` to generate.
 * @see RustyResult
 */
class JSResult<Ok = any, Err = any> {
    readonly #o?: Ok
    readonly #e?: Err
    readonly #s: symbol

    constructor(o: Ok, e: Err, ok: boolean) {
        this.#o = o
        this.#e = e
        this.#s = ok ? _ok : _err
    }

    /**
     * @description Returns true if the result is Ok.
     */
    public get is_ok(): boolean {
        return this.#s === _ok
    }

    /**
     * @description Returns true if the result is Err.
     */
    public get is_err(): boolean {
        return this.#s === _err
    }

    /**
     * @description Returns true if the result is Ok and the value inside of it matches a predicate.
     */
    public is_ok_and(predicate: (v: Ok) => boolean): boolean {
        return this.is_ok && predicate(this.#o!)
    }

    /**
     * @description Returns true if the result is Err and the value inside of it matches a predicate.
     */
    public is_err_and(predicate: (e: Err) => boolean): boolean {
        return this.is_err && predicate(this.#e!)
    }

    /**
     * @description Converts from JSResult<Ok,Err> to JSOption<Ok>.
     */
    public ok(): JSOption<Ok> {
        return this.is_ok ? RustyOption.Some<Ok>(this.#o!) : RustyOption.None
    }

    /**
     * @description Converts from JSResult<Ok,Err> to JSOption<Err>.
     */
    public err(): JSOption<Err> {
        return this.is_err ? RustyOption.Some<Err>(this.#e!) : RustyOption.None
    }

    /**
     * @description Returns the contained Ok value. Because this function may panic, its use is generally discouraged.
     * @throws {TypeError} Panics if the value is an Err.
     * @see unwrap_or
     * @see unwrap_or_else
     */
    public unwrap(): Ok {
        if(this.is_ok) return this.#o!

        throw new TypeError()
    }

    /**
     * @description Returns the contained Ok value or a provided defaultValue.
     * @see unwrap
     * @see unwrap_or_else
     */
    public unwrap_or(defaultValue: Ok): Ok {
        return this.#o ?? defaultValue
    }

    /**
     * @description Returns the contained Ok value or computes it from a closure.
     * @see unwrap
     * @see unwrap_or
     */
    public unwrap_or_else(closure: (e: Err) => Ok): Ok {
        return this.is_ok ? this.#o! : closure(this.#e!)
    }

    /**
     * @description Returns the contained Ok value. Because this function may panic, its use is generally discouraged.
     * @throws {TypeError} Panics if the value is an Err with a custom panic message provided by message.
     */
    public expect(message: string): Ok {
        if(this.is_ok) return this.#o!

        throw new TypeError(message)
    }

    /**
     * @description Returns other if self is Err, otherwise returns the Ok value of self.
     */
    public or<Err2 = any>(other: JSResult<Ok, Err2>): JSResult<Ok, Err2> {
        // @ts-ignore
        return this.is_ok ? this : other
    }

    /**
     * @description Calls op if self is Err, otherwise returns the Ok value of self.
     */
    public or_else<Err2 = any>(op: (e: Err) => JSResult<Ok, Err2>): JSResult<Ok, Err2> {
        // @ts-ignore
        return this.is_ok ? this : op(this.#e!)
    }

    /**
     * @description Returns other if self is Ok, otherwise returns the Err value of self.
     */
    public and<Ok2 = any>(other: JSResult<Ok2>): JSResult<Ok2, Err> {
        // @ts-ignore
        return this.is_ok ? other : this
    }

    /**
     * @description Calls op if the result is Ok, otherwise returns the Err value of self.
     */
    public and_then<Ok2 = any>(op: (v: Ok) => JSResult<Ok2>): JSResult<Ok2, Err> {
        // @ts-ignore
        return this.is_ok ? op(this.#o) : this
    }
}

/**
 * @description `Result` generator
 */
class RustyResult {
    /**
     * @description Contains the success value.
     */
    public static Ok = <Ok = any>(o: Ok): JSResult<Ok, undefined> => new JSResult<Ok, undefined>(o, undefined, true)

    /**
     * @description Contains the error value.
     */
    public static Err = <Err = any>(e: Err): JSResult<undefined, Err> => new JSResult<undefined, Err>(undefined, e, false)

    /**
     * @description match for `Result`.
     */
    public static match<Ok = any, Err = any, OkResult = any, ErrResult = any>(v: JSResult<Ok, Err>, onOk?: (o?: Ok) => OkResult, onErr?: (e?: Err) => ErrResult): OkResult | ErrResult | undefined {
        return v.is_ok ? onOk?.(v.ok().unwrap()) : onErr?.(v.err().unwrap())
    }
}

export { JSResult, RustyResult }
