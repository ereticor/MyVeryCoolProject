import { AnyAction } from "@reduxjs/toolkit";

export const isAnyOfMatch =
  (...matchers: Array<string | { type: string }>) =>
  (action: AnyAction) =>
    matchers.some((matcher) =>
      typeof matcher === "string"
        ? matcher === action.type
        : matcher.type === action.type
    );
