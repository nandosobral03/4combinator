export const boards = ["g", "x"] as const;

export type ValidBoard = (typeof boards)[number];
