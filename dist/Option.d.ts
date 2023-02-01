/**
 * @description rusty `Option` in Js
 * @description Do not instantiate with this class directly, use class `RustyOption` to generate.
 * @see RustyOption
 */
declare class JSOption<Value = any> {
    #private;
    constructor(v: Value, some: boolean);
    /**
     * @description Returns true if the option is a Some value.
     */
    get is_some(): boolean;
    /**
     * @description Returns true if the option is a None value.
     */
    get is_none(): boolean;
    /**
     * @description Returns true if the option is a Some and the value inside of it matches a predicate.
     */
    is_some_and(predicate: (v: Value) => boolean): boolean;
    /**
     * @description Returns the contained Some value.
     * @throws {TypeError} Panics if the self value equals None.
     * @see unwrap_or
     * @see unwrap_or_else
     */
    unwrap(): Value;
    /**
     * @description Returns the contained Some value or a provided defaultValue.
     * @see unwrap
     * @see unwrap_or_else
     */
    unwrap_or(defaultValue: Value): Value;
    /**
     * @description Returns the contained Some value or computes it from a closure.
     * @see unwrap
     * @see unwrap_or
     */
    unwrap_or_else(closure: () => Value): Value;
    /**
     * @description Returns the contained Some value. Because this function may panic, its use is generally discouraged.
     * @throws {TypeError} Panics if the value is a None with a custom panic message provided by message.
     */
    expect(msg: string): Value;
    /**
     * @description Returns the option if it contains a value, otherwise returns other.
     */
    or(other: JSOption<Value>): JSOption<Value>;
    /**
     * @description Returns the option if it contains a value, otherwise calls otherFn and returns the result.
     */
    or_else(otherFn: () => JSOption<Value>): JSOption<Value>;
    /**
     * @description Returns None if the option is None, otherwise returns other.
     */
    and<Value2 = any>(other: JSOption<Value2>): JSOption<Value2>;
    /**
     * @description Returns None if the option is None, otherwise calls op with the wrapped value and returns the result.
     */
    and_then<Value2 = any>(op: (v: Value) => JSOption<Value2>): JSOption<Value2>;
}
/**
 * @description `Option` generator
 */
declare class RustyOption {
    /**
     * @description Some value of type Value.
     */
    static Some: <Value>(v: Value) => JSOption<Value>;
    /**
     * @description No value.
     */
    static get None(): JSOption<any>;
    /**
     * @description match for `Option`
     */
    static match<Value = any, SomeResult = any, NoneResult = any>(v: JSOption<Value>, onSome?: (v: Value) => SomeResult, onNone?: () => NoneResult): SomeResult | NoneResult | undefined;
}
export { JSOption, RustyOption };
