import { JSOption } from "./Option";
/**
 * @description rusty `Result` in Js
 * @description Do not instantiate with this class directly, use class `RustyResult` to generate.
 * @see RustyResult
 */
declare class JSResult<Ok = any, Err = any> {
    #private;
    constructor(o: Ok, e: Err, ok: boolean);
    /**
     * @description Returns true if the result is Ok.
     */
    get is_ok(): boolean;
    /**
     * @description Returns true if the result is Err.
     */
    get is_err(): boolean;
    /**
     * @description Returns true if the result is Ok and the value inside of it matches a predicate.
     */
    is_ok_and(predicate: (v: Ok) => boolean): boolean;
    /**
     * @description Returns true if the result is Err and the value inside of it matches a predicate.
     */
    is_err_and(predicate: (e: Err) => boolean): boolean;
    /**
     * @description Converts from JSResult<Ok,Err> to JSOption<Ok>.
     */
    ok(): JSOption<Ok>;
    /**
     * @description Converts from JSResult<Ok,Err> to JSOption<Err>.
     */
    err(): JSOption<Err>;
    /**
     * @description Returns the contained Ok value. Because this function may panic, its use is generally discouraged.
     * @throws {TypeError} Panics if the value is an Err.
     * @see unwrap_or
     * @see unwrap_or_else
     */
    unwrap(): Ok;
    /**
     * @description Returns the contained Ok value or a provided defaultValue.
     * @see unwrap
     * @see unwrap_or_else
     */
    unwrap_or(defaultValue: Ok): Ok;
    /**
     * @description Returns the contained Ok value or computes it from a closure.
     * @see unwrap
     * @see unwrap_or
     */
    unwrap_or_else(closure: (e: Err) => Ok): Ok;
    /**
     * @description Returns the contained Ok value. Because this function may panic, its use is generally discouraged.
     * @throws {TypeError} Panics if the value is an Err with a custom panic message provided by message.
     */
    expect(message: string): Ok;
    /**
     * @description Returns other if self is Err, otherwise returns the Ok value of self.
     */
    or<Err2 = any>(other: JSResult<Ok, Err2>): JSResult<Ok, Err2>;
    /**
     * @description Calls op if self is Err, otherwise returns the Ok value of self.
     */
    or_else<Err2 = any>(op: (e: Err) => JSResult<Ok, Err2>): JSResult<Ok, Err2>;
    /**
     * @description Returns other if self is Ok, otherwise returns the Err value of self.
     */
    and<Ok2 = any>(other: JSResult<Ok2>): JSResult<Ok2, Err>;
    /**
     * @description Calls op if the result is Ok, otherwise returns the Err value of self.
     */
    and_then<Ok2 = any>(op: (v: Ok) => JSResult<Ok2>): JSResult<Ok2, Err>;
}
/**
 * @description `Result` generator
 */
declare class RustyResult {
    /**
     * @description Contains the success value.
     */
    static Ok: <Ok = any>(o: Ok) => JSResult<Ok, undefined>;
    /**
     * @description Contains the error value.
     */
    static Err: <Err = any>(e: Err) => JSResult<undefined, Err>;
    /**
     * @description match for `Result`.
     */
    static match<Ok = any, Err = any, OkResult = any, ErrResult = any>(v: JSResult<Ok, Err>, onOk?: (o?: Ok) => OkResult, onErr?: (e?: Err) => ErrResult): OkResult | ErrResult | undefined;
}
export { JSResult, RustyResult };
