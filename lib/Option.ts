const _some = Symbol('JSOption.Some')
const _none = Symbol('JSOption.None')

class JSOption<Value = any> {
    readonly #v: Value | null
    readonly #s: symbol

    constructor(v: Value, some: boolean) {
        this.#v = some ? v : null
        this.#s = some ? _some : _none
    }

    /**
     * @description Returns true if the option is a Some value.
     */
    public get is_some(): boolean {
        return this.#s === _some
    }

    /**
     * @description Returns true if the option is a None value.
     */
    public get is_none(): boolean {
        return this.#s === _none
    }

    /**
     * @description Returns true if the option is a Some and the value inside of it matches a predicate.
     */
    public is_some_and(predicate: (v: Value) => boolean): boolean {
        return this.is_some && predicate(this.#v!)
    }

    /**
     * @description Returns the contained Some value.
     * @throws {TypeError} Panics if the self value equals None.
     */
    public unwrap(): Value {
        if(this.is_some) return this.#v!

        throw new TypeError()
    }

    /**
     * @description Returns the contained Some value or a provided defaultValue.
     */
    public unwrap_or(defaultValue: Value): Value {
        return this.#v ?? defaultValue
    }

    /**
     * @description Returns the contained Some value or computes it from a closure.
     */
    public unwrap_or_else(closure: () => Value): Value {
        return this.#v ?? closure()
    }

    /**
     * @description Returns the contained Some value. Because this function may panic, its use is generally discouraged.
     * @throws {TypeError} Panics if the value is a None with a custom panic message provided by message.
     */
    public expect(msg: string): Value {
        if(this.is_some) return this.#v!

        throw new TypeError(msg)
    }

    /**
     * @description Returns the option if it contains a value, otherwise returns other.
     */
    public or(other: JSOption<Value>): JSOption<Value> {
        return this.is_some ? this : other
    }

    /**
     * @description Returns the option if it contains a value, otherwise calls otherFn and returns the result.
     */
    public or_else(otherFn: () => JSOption<Value>): JSOption<Value> {
        return this.is_some ? this : otherFn()
    }

    /**
     * @description Returns None if the option is None, otherwise returns other.
     */
    public and<Value2 = any>(other: JSOption<Value2>): JSOption<Value2> {
        // @ts-ignore
        return this.is_some ? other : this
    }

    /**
     * @description Returns None if the option is None, otherwise calls op with the wrapped value and returns the result.
     */
    public and_then<Value2 = any>(op: (v: Value) => JSOption<Value2>): JSOption<Value2> {
        // @ts-ignore
        return this.is_some ? op(this.#v) : this
    }
}

class RustyOption {
    /**
     * @description Some value of type Value.
     */
    public static Some = <Value>(v: Value) => new JSOption<Value>(v, true)

    /**
     * @description No value.
     */
    public static get None() {
        return new JSOption<any>(undefined, false)
    }

    /**
     * @description match for Option
     */
    public static match<Value = any, SomeResult = any, NoneResult = any>(v: JSOption<Value>, onSome?: (v: Value) => SomeResult, onNone?: () => NoneResult): SomeResult | NoneResult | undefined {
        return v.is_some ? onSome?.(v.unwrap()) : onNone?.()
    }
}

export type { JSOption }
export { RustyOption }
