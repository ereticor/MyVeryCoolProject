/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/ban-types */
export default (func: Function, ms: number): Function => {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastTime: number;
  return function () {
    //@ts-ignore
    const context = this;
    const args = arguments;
    if (!lastTime) {
      func.apply(context, args);
      lastTime = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastTime >= ms) {
          func.apply(context, args);
          lastTime = Date.now();
        }
      }, ms - (Date.now() - lastTime));
    }
  };
};
