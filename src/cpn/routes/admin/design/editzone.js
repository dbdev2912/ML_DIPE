import { useSelector, useDispatch } from 'react-redux';
import { blockRender, contentRender } from './renderers';

import $ from 'jquery';

export default () => {

    const { page, showBar, hideBar, elements, currentMouseOn } = useSelector(state => state);
    const { mouseState } = useSelector( state => state.axis );
    const dispatch = useDispatch();
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
        }


    const mouseLeaveTrigger = (e, elt) => {
        if( mouseState === "move" ){

        }
    }

    const pageRender = (elts) => {
        return elts.map(elt => {
            if( !elt.children ){
                return contentRender(elt)
            }else{
                return (
                    <div className="m-l-1" style={ elt.style } id={ elt.id } high-light={ elt.id === currentMouseOn ? "true" : "false" } onMouseEnter={ (e) => { mouseEnterTrigger(e, elt) } } onMouseLeave= { (e) => { mouseLeaveTrigger(e, elt) } }>
                        <span className="text-20-px bold">{ elt.type }</span>
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
