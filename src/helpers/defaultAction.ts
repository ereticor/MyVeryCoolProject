import { Dispatch } from "redux";

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
        return dispatch({
          type: successType,
          payload: data,
        });
      })
      .catch((error) => {
        return dispatch({
          type: errorType,
          payload: error,
        });
      });
  };
};
