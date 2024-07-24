import { atom } from "recoil";

export const ncpClientIdState = atom<string | undefined>({
  key: "ncpClientIdState",
  default: undefined,
});
