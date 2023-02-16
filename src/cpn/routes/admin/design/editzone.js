import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { blockRender, contentRender } from './renderers';

import $ from 'jquery';

export default () => {

    const { page, showBar, hideBar, elements, currentMouseOn, currentEditingBlock } = useSelector(state => state);
    const { mouseState } = useSelector( state => state.axis );
    const dispatch = useDispatch();
    const [ selectedId, setSI ] = useState("");
    const [ enterOn, setEnterOn ] = useState("");

    // const mouseMove = (e) => {
    //     const { pageX, pageY } = e;
    //     if( mouseState != "up" ){
    //         dispatch({
    //             branch: "editor",
    //             type: "setAxis",
    //             payload: {
    //                 x: pageX, y: pageY,
    //                 mouseState: "move",
    //             }
    //         })
    //     }
    // }

    const mouseEnterTrigger = (e, elt) => {
        const { id } = elt;
        if( mouseState === "move" ){
            dispatch({
                branch: "editor",
                type: "setCurrentMouseOn",
                payload: {
                    id
                }
            })
        }
        setEnterOn(elt.id)
    }

    const mouseEnterTriggerButForContentOnly = (e, elt) => {
        const { id } = elt;
        setEnterOn(elt.id)
    }


    const mouseLeaveTrigger = (e, elt) => {
        if( mouseState === "move" ){

        }
    }

    const setCurrentEditing = (id) => {
        if( id == enterOn ){
            dispatch({
                type: "setCurrentEditingBlock",
                branch: "editor",
                payload: {
                    id
                }
            })
        }
    }


    const pageRender = (elts) => {

        return elts.map(elt => {
            if( !elt.children ){
                return contentRender(elt, setCurrentEditing, mouseEnterTriggerButForContentOnly, currentMouseOn, currentEditingBlock)
            }else{
                return (
                    <div style={ elt.style } id={ elt.id } onClick={ () =>  { setCurrentEditing(elt.id) } } high-light={ elt.id === currentMouseOn ? "true" : "false" } high-light-edit={ elt.id === currentEditingBlock ? "true" : "false" } onMouseEnter={ (e) => { mouseEnterTrigger(e, elt) } } onMouseLeave= { (e) => { mouseLeaveTrigger(e, elt) } }>
                        {
                            pageRender( elt.children )
                        }
                    </div>
                )
            }
        })
    }

    return(
        <div className="zone rel z-index-5">
            {  pageRender(elements.children) }
        </div>
    )
}
