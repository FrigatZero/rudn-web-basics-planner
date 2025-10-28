import React from "react";
import { IPosition, ISize } from "../BoxInteractionController.tsx";
import { CORNER, BLOB_SIZE } from "../config.ts"
import './Blob.css';
import classNames from "classnames";

export interface BlobProps {
    parentId: number;
    parentPosition: IPosition;
    parentSize: ISize;
    onPositionChange(id: number, newPosition: IPosition): void;
    onResize(id: number, newSize: ISize): void;
    corner: CORNER;
}

export const Blob = (props: BlobProps) => {
    const blobRef = React.useRef<HTMLDivElement>(null);
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
        const doResize = (newWidth: number, newHeight: number, newX: number, newY: number) => {
            props.onResize(
                props.parentId, 
                {
                    width: newWidth, 
                    height: newHeight
                }
            );
            props.onPositionChange(
                props.parentId, 
                {
                    x: newX,
                    y: newY
                }
            );
        }
        if(isBlobDown.current) {
            switch(props.corner){
                case CORNER.TOP_LEFT:
                    doResize(
                        props.parentSize.width  - e.movementX,
                        props.parentSize.height - e.movementY,
                        props.parentPosition.x  + e.movementX,
                        props.parentPosition.y  + e.movementY
                    )
                    break;
                case CORNER.TOP_RIGHT: 
                    doResize(
                        props.parentSize.width  + e.movementX,
                        props.parentSize.height - e.movementY,
                        props.parentPosition.x,
                        props.parentPosition.y  + e.movementY
                    )
                    break;
                case CORNER.BOTTOM_LEFT:
                    doResize(
                        props.parentSize.width  - e.movementX,
                        props.parentSize.height + e.movementY,
                        props.parentPosition.x  + e.movementX,
                        props.parentPosition.y
                    )
                    break;
                case CORNER.BOTTOM_RIGHT:
                    doResize(
                        props.parentSize.width  + e.movementX,
                        props.parentSize.height + e.movementY,
                        props.parentPosition.x,
                        props.parentPosition.y
                    )
                    break;
            }    
        }
    }
    const classBySide = (corner: CORNER) => {
        switch (corner) {
            case CORNER.TOP_LEFT: return '_topLeft'
            case CORNER.TOP_RIGHT: return '_topRight'
            case CORNER.BOTTOM_LEFT: return '_bottomLeft'
            case CORNER.BOTTOM_RIGHT: return '_bottomRight'
            default: return null;
        }
    }
    return <div 
                className={classNames( 
                    "Blob",
                    classBySide(props.corner)
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