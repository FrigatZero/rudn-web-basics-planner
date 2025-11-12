import { IPosition, ISize } from "../BoxInteractionController"
import { SIDE } from "../config"
import './Pivot.css'

export interface PivotProps {
    parentId: number;
    parentPosition: IPosition;
    parentSize: ISize;
    side: SIDE;
}

export const Pivot = (props: PivotProps) => {

    const classBySide = (side: SIDE) => {
            switch (side) {
                case SIDE.TOP: return '_top'
                case SIDE.RIGHT: return '_right'
                case SIDE.BOTTOM: return '_bottom'
                case SIDE.LEFT: return '_left'
                default: return null;
            }
        }
    return <div className="Pivot" style={{
        left: props.parentPosition.x + props.parentSize.width / 2 - 5,
        top: props.parentPosition.y - 5
    }}/>
}