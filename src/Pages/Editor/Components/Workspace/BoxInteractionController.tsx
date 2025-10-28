import { useRef } from "react";
import { Blob } from './Misc/Blob.tsx';
import { CORNER } from './config.ts'

export interface IPosition {
    x: number;
    y: number;
} 
export interface ISize {
    width: number;
    height: number;
}

export interface BoxInteractionControllerProps {
    id: number;
    position: IPosition;
    size: ISize;
    onPositionChange(id: number, newPosition: IPosition): void;
    onResize(id: number, newSize: ISize): void;
}

export const BoxInteractionController = (props: BoxInteractionControllerProps) => {
    const ref = useRef<HTMLDivElement>(null);
    // Обработка событий нажатия мышью
    const isDown = useRef<boolean>(false);
    const handleDown = (e: React.PointerEvent) => {
        if (isDown) {
            isDown.current = true;
            ref.current?.setPointerCapture(e.pointerId);
        }
    }
    const handleUp = (e: React.PointerEvent) => {
        isDown.current = false;
        ref.current?.releasePointerCapture(e.pointerId);
    }
    const handleMove = (e: React.PointerEvent) => {
        if(isDown.current) {
            props.onPositionChange(props.id, {x: (props.position.x + e.movementX), y: (props.position.y + e.movementY)});
        }
    }
    return <div
                className="SimpleBox"
                onPointerDown={handleDown}
                onPointerUp={handleUp}
                onPointerMove={handleMove}
                onPointerCancel={handleUp}
                ref={ref}
                
                style={{
                    left: props.position.x,
                    top: props.position.y,
                    width: props.size.width,
                    height: props.size.height
                }}
            >
            {props.id}
            <Blob
                parentId={props.id}
                parentPosition={props.position}
                parentSize={props.size}
                onPositionChange={props.onPositionChange}
                onResize={props.onResize}
                corner={CORNER.TOP_LEFT}
            />
            <Blob
                parentId={props.id}
                parentPosition={props.position}
                parentSize={props.size}
                onPositionChange={props.onPositionChange}
                onResize={props.onResize}
                corner={CORNER.TOP_RIGHT}
            />
            <Blob
                parentId={props.id}
                parentPosition={props.position}
                parentSize={props.size}
                onPositionChange={props.onPositionChange}
                onResize={props.onResize}
                corner={CORNER.BOTTOM_LEFT}
            />
            <Blob
                parentId={props.id}
                parentPosition={props.position}
                parentSize={props.size}
                onPositionChange={props.onPositionChange}
                onResize={props.onResize}
                corner={CORNER.BOTTOM_RIGHT}
            />
    </div>
}