import { ChangeEvent, useCallback, useMemo, useState } from "react";

/**
 * Lead element controls followers.
 * Each follower can be true or false, a mixed state altogether.
 * Use in Checkbox that selects all/none.
 */

function useMixedState<T extends { [key: string]: boolean }>(
  items: T
): [
  {
    output: T;
    all: boolean;
    mixed: boolean | "mixed";
  },
  {
    onFollowerChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onLeadChange: () => void;
  }
] {
  if (process.env.NODE_ENV === "development") {
    console.warn("[onLeadChange] spread to the commanding CheckBox");
  }

  const [mixedState, dispatchUpdate] =
    useState<{ [key: string]: boolean }>(items);

  const allChecked = useMemo(() => {
    return Object.keys(mixedState).every(
      (condiment: string) => mixedState[condiment] === true
    );
  }, [mixedState]);

  const someChecked = useMemo(() => {
    return allChecked
      ? false
      : Object.keys(mixedState).some(
          (condiment: string) => mixedState[condiment] === true
        );
  }, [mixedState, allChecked]);

  const parentIsChecked = useMemo(() => {
    return allChecked ? true : someChecked ? "mixed" : false;
  }, [someChecked, allChecked]);

  const onLeadChange = useCallback(() => {
    return dispatchUpdate(
      Object.keys(mixedState).reduce(
        (state, condiment) => ({
          ...state,
          [condiment]: !allChecked,
        }),
        {}
      )
    );
  }, [allChecked, mixedState]);

  const onFollowerChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = event.target;
      return dispatchUpdate({
        ...mixedState,
        [value]: checked,
      });
    },
    [mixedState]
  );

  return [
    {
      output: mixedState as T,
      all: allChecked,
      mixed: parentIsChecked,
    },
    { onFollowerChange, onLeadChange },
  ];
}

export default useMixedState;
