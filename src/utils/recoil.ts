import { atom } from "recoil";

export const EditContent = atom({
  key: "EditContent",
  default: { title: "난나나나", content: "솨아아" },
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});
