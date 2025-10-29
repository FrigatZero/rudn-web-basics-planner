import { IPosition, ISize } from "../BoxInteractionController"
import './Pivot.css'

export interface PivotProps {
    parentId: number
    parentPosition: IPosition
    parentSize: ISize
}

export const Pivot = (props: PivotProps) => {


    return <div className="Pivot" style={{
        left: props.parentPosition.x + props.parentSize.width / 2 - 5,
        top: props.parentPosition.y - 5
    }}/>
}