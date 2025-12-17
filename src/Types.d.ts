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
    key: number;
    from: number;
    to: number;
    fromPort: number;
    toPort: number;
    data?: any;
}

export const enum SIDE {
    TOP = 1,
    RIGHT,
    BOTTOM,
    LEFT
}