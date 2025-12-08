export interface Position {
    x: number;
    y: number;
}
export type Point = Position

export interface Size {
    width: number;
    height: number;
}

export interface Link {
    from: number;
    to: number;
    fromHost?: number;
    toHost?: number;
}

export const enum SIDE {
    TOP = 1,
    RIGHT,
    BOTTOM,
    LEFT
}