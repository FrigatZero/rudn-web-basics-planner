import React from "react";
import { BoxInteractionControllerProps } from "./BoxInteractionController.tsx";
import { SIDE, BLOB_SIZE } from "./config.ts"
import './Blob.css';
import classNames from "classnames";

export interface BlobProps {
    parentProps: BoxInteractionControllerProps;
    side: SIDE;
}

export const Blob = (props: BlobProps) => {
    const blobRef = React.useRef<HTMLDivElement>(null);
    const parent = props.parentProps;
    // обработка событий Blob
    const isBlobDown = React.useRef<boolean>(false);
    const handleBlobDown = (e: React.PointerEvent) => {
        e.stopPropagation();
        if (isBlobDown) {
            isBlobDown.current = true;
            blobRef.current?.setPointerCapture(e.pointerId);
        }
    }
    const handleBlobUp = (e: React.PointerEvent) => {
        isBlobDown.current = false;
        blobRef.current?.releasePointerCapture(e.pointerId);
    }
    const handleBlobMove = (e: React.PointerEvent) => {
        const doResize = (newWidth:number, newHeight:number, newX:number, newY:number) => {
            parent.onResize(
                parent.id, 
                {
                    width: newWidth, 
                    height: newHeight
                }
            );
            parent.onPositionChange(
                parent.id, 
                {
                    x: newX,
                    y: newY
                }
            );
        }
        if(isBlobDown.current) {
            switch(props.side){
                case SIDE.TOP_LEFT:
                    doResize(
                        parent.size.width  - e.movementX,
                        parent.size.height - e.movementY,
                        parent.position.x  + e.movementX,
                        parent.position.y  + e.movementY
                    )
                    break;
                case SIDE.TOP_RIGHT: 
                    doResize(
                        parent.size.width  + e.movementX,
                        parent.size.height - e.movementY,
                        parent.position.x,
                        parent.position.y  + e.movementY
                    )
                    break;
                case SIDE.BOTTOM_LEFT:
                    doResize(
                        parent.size.width  - e.movementX,
                        parent.size.height + e.movementY,
                        parent.position.x  + e.movementX,
                        parent.position.y
                    )
                    break;
                case SIDE.BOTTOM_RIGHT:
                    doResize(
                        parent.size.width  + e.movementX,
                        parent.size.height + e.movementY,
                        parent.position.x,
                        parent.position.y
                    )
                    break;
            }    
        }
    }
    const classBySide = (side: SIDE) => {
        switch (side) {
            case SIDE.TOP_LEFT: return '_topLeft'
            case SIDE.TOP_RIGHT: return '_topRight'
            case SIDE.BOTTOM_LEFT: return '_bottomLeft'
            case SIDE.BOTTOM_RIGHT: return '_bottomRight'
            default: return null;
        }
    }
    return <div 
                className={classNames( 
                    "Blob",
                    classBySide(props.side)
                )} 
                onPointerDown={handleBlobDown}
                onPointerUp={handleBlobUp}
                onPointerMove={handleBlobMove}
                onPointerCancel={handleBlobUp}
                ref={blobRef}

                style={{
                    ['--size']: BLOB_SIZE + 'px',
                    borderRadius:    "20%",
                    position:        "absolute",
                } as React.CSSProperties}
            >
    </div>
}