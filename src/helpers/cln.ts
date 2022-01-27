export const cln = (...classes: Array<string | boolean>) =>
  classes?.filter(Boolean).join(" ");
