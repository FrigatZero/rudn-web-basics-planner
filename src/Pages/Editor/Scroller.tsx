import { useRef } from "react"
import './Scroller.css'

export interface ScrollerProps {
    top: number,
    height: number,
    onPositionChange(top: number): void
}


export const Scroller = (props: ScrollerProps) => {
    const ref = useRef<HTMLDivElement>(null);
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
            const delta = props.top + e.movementX;
            if (delta < props.height) {
                props.onPositionChange(props.top + e.movementY);
            }
        }
    }

    return <div
        className="Scroller"
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerMove={handleMove}
        onPointerCancel={handleUp}
        ref={ref}

        style={{
            position: "absolute",
            top: props.top
        }}
    >

    </div>
}