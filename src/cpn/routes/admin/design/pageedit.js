import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import HorizonBar from '../layout/horizon-bar';
import VerticalBar from '../layout/vertical-bar';
import $ from 'jquery';
import { openTab } from '../../../useful';


import General from './editor/general';
import Content from './editor/content';
import Blocks from './editor/blocks';

import EditZone from './editzone';
import Movable from './editor/movable';

export default () => {
    const unique_string = useSelector(state => state.unique_string);
    const { page_id } = useParams();
    const [ page, setPage ] = useState({});
    const [ editorState, setEditorState ] = useState(true);
    const [ highLights, setHighLights ] = useState([ 1, 0, 0 ])

    const { x, y } = useSelector(state => state.axis)

    const dispatch = useDispatch();

    const { mouseState } = useSelector( state => state.axis );
    const mouseMove = (e) => {
        const { pageX, pageY } = e;
        if( mouseState != "up" ){
            dispatch({
                branch: "editor",
                type: "setAxis",
                payload: {
                    x: pageX, y: pageY,
                    mouseState: "move",
                }
            })
        }
    }

    useEffect(()=> {
        fetch(`/api/${ unique_string }/page/${ page_id }`).then(res => res.json()).then(data => {
            const { success, page } = data;
            if( success ){
                dispatch({
                    branch: "editor",
                    type: "setPage",
                    payload: { page: page[0], hideBar, showBar }
                })
            }
        })

    }, [])

    const hideBar = () => {
        setEditorState(false)
    }
    const showBar = () => {
        setEditorState(true)
    }

    return(
        <div className="rel" onMouseMove = { mouseMove }>
            <div className={"fixed editor t-0 shadow z-index-20 bg-white " + (editorState ? "editor-show": "editor-hide") } style={{ width: "768px", height: "100vh" }}>
                <div className="rel p-0-5">
                    <div className={"abs arrow-container flex flex-center pointer " + (editorState ? "arrow-show": "arrow-hide")} onClick={ () => { setEditorState(  !editorState )} }>
                        <span className="arrow-right "/>
                    </div>
                    <div className="flex flex-no-wrap flex-center border-1-bottom">
                        <div className="p-1 p-l-2 p-r-2" onClick={ () => { setHighLights([1, 0, 0]) } }><span className={"text-16-px pointer black-hover " + (highLights[0] ? "black": "gray")}>Chung</span></div>
                        <div className="p-1 p-l-2 p-r-2" onClick={ () => { setHighLights([0, 1, 0]) } }><span className={"text-16-px pointer black-hover " + (highLights[1] ? "black": "gray")}>Khối</span></div>
                        <div className="p-1 p-l-2 p-r-2" onClick={ () => { setHighLights([0, 0, 1]) } }><span className={"text-16-px pointer black-hover " + (highLights[2] ? "black": "gray")}>Nội dung</span></div>
                    </div>
                </div>

                <div>
                    { highLights[0] ?
                        <General /> : null
                    }
                    { highLights[1] ?
                        <Blocks /> : null
                    }
                    { highLights[2] ?
                        <Content /> : null
                    }
                </div>

            </div>
            <div>
                <EditZone />
            </div>
            <Movable x={ x } y={ y } />
        </div>
    )
}
