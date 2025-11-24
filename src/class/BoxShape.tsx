import { Position, Size } from "../Types";

export class BoxShape {
    private _position: Position = {x: 0, y: 0};
    private _size: Size = {width: 100, height: 70};
    private _color: string = "#FFFFFF";

    get position(): Position {
        return this._position;
    }
    get size(): Size {
        return this._size;
    }
    get color(): string {
        return this._color;
    }

    set position(newPosition: Position) {
        this._position = newPosition;
    }
    set size(newSize: Size) {
        this._size = newSize;
    }
    set color(newColor: string) {
        if (newColor.length > 0) {
            this._color = newColor
        }
    }
}