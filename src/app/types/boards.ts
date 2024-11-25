export const boards = [
  "g",
  "x",
  "v",
  "wg",
  "tv",
  "o",
  "an",
  "sp",
  "fa",
  "sci",
  "his",
  "int",
  "out",
  "ck",
  "p",
  "lit",
  "mu",
  "gd",
  "diy",
] as const;

export type ValidBoard = (typeof boards)[number];
