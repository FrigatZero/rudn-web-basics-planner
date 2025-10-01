import { useEffect, useState } from 'react';
import './Editor.css'
import { SimpleBox } from './Components/Workspace/SimpleBox';
import { Scroller } from './Scroller';
import BoxButtonSvg from './assets/box.svg'
import CrossSvg from './assets/cross.svg'
import UndoSvg from './assets/undo.svg'
import RedoSvg from './assets/redo.svg'
import CopySvg from './assets/copy.svg'
import PasteSvg from './assets/paste.svg'
import SearchSvg from './assets/search.svg'

export default function Editor(){
    // Хуки для элементов рабочей области
    const [
        objectId,
        setObjectId
    ] = useState(0);
    const [
        workspaceObjects, 
        setWorkspaceObjects
    ] = useState([]);
    
    // Хук для позиции скролла
    const [
        scrollPosition,
        setScrollPosition
    ] = useState(0);
    
    // Хуки для элементов панели инструментов
    const [
        toolboxObjectId,
        setToolboxObjectId
    ] = useState(0);
    const [
        toolboxObjects,
        setToolboxObjects
    ] = useState([]);
    
    // Обработчик нажатия на кнопку создания коробки
    const on_click_boxButton_handler = () => {
        setWorkspaceObjects([
            ...workspaceObjects,
            {
                objectId:objectId, 
                position:{x:30,y:90},
                size:{width:100,height:70}
            }
        ]);
        setObjectId(i => i + 1);
    }

    // Получение объектов рабочей области
    const getWorkspaceObjects = () => {
        return <>
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
    }

    // Получение объектов панели инструментов
    const getToolboxObjects = () => {
        return <>
        {
            toolboxObjects.map(element => 
                (
                    <div 
                        className='boxButton' 
                        key={element.toolboxObjectId + 'tb'}
                        onClick={on_click_boxButton_handler}
                        >
                            <img 
                                src={BoxButtonSvg} 
                                alt='' 
                                width="30" 
                                style={{
                                    marginRight: "10px",
                                    verticalAlign: "middle",
                                }}
                            ></img>
                            Box #{element.toolboxObjectId} 
                    </div>
                )
            )
        }
        </>
    }

    useEffect(
        () => {
            setToolboxObjects(
                [
                    {toolboxObjectId:1},
                    {toolboxObjectId:2}
                ]
            );
        }, []    
    )

    return (
        <div className='editor'>
            <div className='editor__settings'>
                <div className='panel-settings'>
                    Panel settings
                </div>

                <div className='sheet-selector'>
                    <div className='sheet-selector__sheet'>
                        sheet #1
                    </div>
                    <div className='sheet-selector__sheet'>
                        sheet #2
                    </div>
                </div>
                
                <div className='status-bar'>
                    Total:
                    <div className='status-bar__total'>
                        0
                    </div>
                    Running:
                    <div className='status-bar__running'>
                        1
                    </div>
                    Stopped:
                    <div className='status-bar__stopped'>
                        2
                    </div>
                </div>

                <div className='main-menu'>
                    <div className='main-menu__file'>
                        File
                    </div>
                    <div className='main-menu__edit'>
                        Edit
                    </div>
                    <div className='main-menu__help'>
                        Help
                    </div>
                </div>
                {/* TODO */}
            </div>
            <div className='editor__panel'>
                <div className='toolbox'>
                    <div className='toolbox__search'>
                        <input type='search' id='tools' style={{
                            width: '90%',
                            borderRadius: '20px',
                            margin: '5px',
                        }}>
                            {/* TODO */}
                        </input>
                    </div>
                    <div className='toolbox__list'>
                        {getToolboxObjects()}
                    </div>
                    <div className='toolbox__scroll'>
                        <Scroller
                            top={scrollPosition}
                            height={1000}
                            onPositionChange={(top) => {
                                setScrollPosition(top);
                            }}>
                        </Scroller>
                        {/* TODO */}
                    </div>
                </div>
                <div className='block-details'>
                    <div className='block-details__name'>
                        Details
                        <div style={{
                            height: "11px",
                            width: "11px",
                            cursor: "pointer",
                        }}>
                                <svg width="100%" height="100%" style={{}}>
                                <line x1="1" y1="10"
                                x2="10" y2="1"
                                stroke="rgb(50, 50, 50)"
                                strokeWidth="2"/>
                                <line x1="1" y1="1"
                                x2="10" y2="10"
                                stroke="rgb(50, 50, 50)"
                                strokeWidth="2"/>
                            </svg>
                        </div>
                    </div>
                    {/* TODO */}
                </div>
            </div>
            <div className='editor__workspace'>
                {getWorkspaceObjects()}

                <div className='file-path'>
                    Project / folder / folder / file_name
                </div>
                
                <div className='action-bar'>
                    <div className='action-bar__remove'>
                        <img 
                            src={CrossSvg} 
                            alt='' 
                            width="15" 
                        ></img>
                        {/* TODO */}
                    </div>

                    <div className='action-bar__complex'>
                        <div className='action-bar__complex__undo'>
                            <img 
                                src={UndoSvg} 
                                alt='' 
                                width="15" 
                            ></img>
                            {/* TODO */}
                        </div>
                        <div className='action-bar__complex__redo'>
                            <img 
                                src={RedoSvg} 
                                alt='' 
                                width="15" 
                            ></img>
                            {/* TODO */}
                        </div>
                    </div>

                    <div className='action-bar__complex'>
                        <div className='action-bar__complex__copy'>
                            <img 
                                src={CopySvg} 
                                alt='' 
                                width="15" 
                            ></img>
                            {/* TODO */}
                        </div>
                        <div className='action-bar__complex__paste'>
                            <img 
                                src={PasteSvg} 
                                alt='' 
                                width="15" 
                            ></img>
                            {/* TODO */}
                        </div>
                    </div>
                    <div className='action-bar__search'>
                        <img 
                            src={SearchSvg} 
                            alt='' 
                            width="15" 
                        ></img>
                        {/* TODO */}
                    </div>
                </div>

                <div className='zoom-box'>
                    <button className='zoom-box__In' >+</button>
                    <button className='zoom-box__Out'>-</button>
                </div>
            </div>
        </div>
    )
}