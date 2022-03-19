import isNil from "lodash.isnil";
import { useRef } from "react";

type UnknownArray = Array<unknown>;
type UnknownObject = { [key: string]: UnknownArray };

function useCache() {
  const c = useRef({
    cache: {} as UnknownObject,
    paused: false,
    has(key: string) {
      const ok = !isNil(this.cache[key]);
      return ok ? true : false;
    },
    set(key: string, value: UnknownArray) {
      this.cache[key] = value;
    },
    clear() {
      this.cache = {};
    },
    get(key: string) {
      if (!this.has(key)) {
        return undefined;
      }
      return this.cache[key];
    },
  }).current;

  return c;
}

export default useCache;
