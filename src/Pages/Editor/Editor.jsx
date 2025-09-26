import { useState } from 'react';
import './Editor.css'
import { SimpleBox } from './Components/SimpleBox';

export default function Editor(){
    const [
        objectId,
        setObjectId
    ] = useState(0);
    const [
        workspaceObjects, 
        setWorkspaceObjects
    ] = useState([]);
    
    const on_click_boxButton_handler = () => {
        setWorkspaceObjects([
            ...workspaceObjects,
            {
                objectId:objectId, 
                position:{x:10,y:10},
                size:{width:100,height:70}
            }
        ]);
        setObjectId(i => i + 1);
    }

    const getWorkspaceObjects = () => {
        return (
            <>
            {
                workspaceObjects.map(element => 
                    (
                        <SimpleBox 
                            key={element.objectId}
                            id={element.objectId} 
                            position={element.position}
                            size={element.size}
                            onNewPosition={(id, pos)=>{
                                const oldObjects = workspaceObjects.map(x => x);
                                const object = oldObjects.find(x => x.objectId == id);
                                object.position = pos;
                                setWorkspaceObjects(oldObjects);
                            }}
                            onNewSize={(id, size) => {
                                const oldObjects = workspaceObjects.map(x => x)
                                const object = oldObjects.find(x => x.objectId == id);
                                object.size = size;
                                setWorkspaceObjects(oldObjects);
                            }}
                        />
                    )
                )
            }
            </>
        )
    }

    return (
        <div className='Editor'>
            <div className='Editor__panel'>
                editor__panel
                <div className='Panel'>  
                    <div 
                        className='Panel__boxButton' 
                        onClick={on_click_boxButton_handler}
                    >
                    </div>
                </div>
            </div>
            <div className='Editor__workspace'>
                editor__workspace
                {getWorkspaceObjects()}
            </div>
        </div>
    )
}