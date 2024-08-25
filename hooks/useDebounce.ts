import { useEffect } from "react";

function useDebounce(fn: () => void, delay: number, deps: any = []) {
  useEffect(() => {
    const handler = setTimeout(() => {
      fn();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...deps, delay]);
}

export default useDebounce;
