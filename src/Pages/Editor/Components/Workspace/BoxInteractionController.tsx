import { useRef } from "react";
import { Blob } from './Blob.tsx';
import { SIDE } from './config.ts'

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
                parentProps={props}
                side={SIDE.TOP_LEFT}
            />
            <Blob
                parentProps={props}
                side={SIDE.TOP_RIGHT}
            />
            <Blob
                parentProps={props}
                side={SIDE.BOTTOM_LEFT}
            />
            <Blob
                parentProps={props}
                side={SIDE.BOTTOM_RIGHT}
            />
    </div>
}