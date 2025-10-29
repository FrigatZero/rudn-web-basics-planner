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
    const initMousePos = useRef<IPosition>({x: 0, y: 0});
    const startPos = useRef<IPosition>({x: 0, y: 0});
    // Обработка событий нажатия мышью
    const isDown = useRef<boolean>(false);
    const handleDown = (e: React.PointerEvent) => {
        if (isDown) {
            isDown.current = true;
            initMousePos.current.x = e.clientX;
            initMousePos.current.y = e.clientY;
            startPos.current.x = props.position.x;
            startPos.current.y = props.position.y;
            ref.current?.setPointerCapture(e.pointerId);
        }
    }
    const handleUp = (e: React.PointerEvent) => {
        isDown.current = false;
        initMousePos.current.x = 0;
        initMousePos.current.y = 0;
        ref.current?.releasePointerCapture(e.pointerId);
    }
    const handleMove = (e: React.PointerEvent) => {
        // if(isDown.current) {
        //     console.log(e.movementX);
        //     props.onPositionChange(props.id, {x: (props.position.x + e.movementX), y: (props.position.y + e.movementY)});
        // }
        if (isDown.current) {
            const dx = e.clientX - initMousePos.current.x;
            const dy = e.clientY - initMousePos.current.y;
            props.onPositionChange(props.id, {x: (startPos.current.x + dx), y: (startPos.current.y + dy)})
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