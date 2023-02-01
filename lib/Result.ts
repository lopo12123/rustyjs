type RustyResult<Ok = undefined, Err = undefined> = Readonly<{
    _o?: Ok,
    _e?: Err,
    _s: symbol
    unwrap(): Ok
}>

class Result {
    static #ok = Symbol('Result.Ok')
    static #err = Symbol('Result.Err')

    // true
    public static Ok<T = any>(o: T): RustyResult<T, undefined> {
        const r = {
            _o: o, _s: Result.#ok,
            unwrap() {
                return o
            }
        }
        Object.freeze(r)
        return r
    }

    // value
    public static Err<E = any>(e: E): RustyResult<undefined, E> {
        const r = {
            _e: e, _s: Result.#err,
            unwrap() {
                throw new TypeError('Result.Err cannot be properly unwrapped.')
            }
        }
        Object.freeze(r)
        return r
    }

    public static match<T = undefined, E = undefined>(v: RustyResult<T, E>, onOk?: (v?: T) => any, onErr?: (v?: E) => any) {
        if(v._s === Result.#ok) return onOk?.(v._o)
        else if(v._s === Result.#err) return onErr?.(v._e)
        else throw TypeError('The received value is not a valid RustyResult!')
    }
}

export {
    Result
}
export type {
    RustyResult
}
