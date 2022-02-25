import { useCallback, useMemo } from "react";

/**
 * 'Merge' dynamic styles.
 */

function useStyles(...styles: Array<unknown>): {
  output: string;
  make: (...nextStyles: Array<unknown>) => string;
} {
  const output = useMemo(() => {
    return _clxs(styles);
  }, [styles]);

  const make = useCallback((...nextStyles: Array<unknown>) => {
    return _clxs(nextStyles);
  }, []);

  return { output, make };
}

function _clxs(predicate: Array<unknown>) {
  return predicate.filter(Boolean).join(" ");
}

export default useStyles;
