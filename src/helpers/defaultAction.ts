import { Dispatch } from "@reduxjs/toolkit";

interface IDefaultAction {
  apiFunction: () => Promise<unknown>;
  types: { startType: string; successType: string; errorType: string };
}

export const defaultAction = ({
  apiFunction,
  types: { startType, successType, errorType },
}: IDefaultAction) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: startType });
    return apiFunction()
      .then((data) => {
        dispatch({
          type: successType,
          data,
        });
      })
      .catch((error) => {
        dispatch({
          type: errorType,
          error,
        });
      });
  };
};
