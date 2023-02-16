import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

export default (props) => {
    const { hideBar, showBar, page } = useSelector( state => state );
    const dispatch = useDispatch();

    const { x, y } = useSelector( state => state.axis );

    const mouseDownTrigger = (e, type) => {
        const { pageX, pageY } = e;
        hideBar()
        dispatch({
            branch: "editor",
            type: "setSelectedBlock",
            payload: { blockType: type }
        })
        dispatch({
            branch: "editor",
            type: "setAxis",
            payload: {
                mouseState: "down",
                x: pageX, y: pageY,
            }
        })
    }

    return(
        <div>
            <div className="p-1">
                <span className="text-24-px">Các khối</span>
                <div className="flex flex-wrap">
                    <div className="cpn-icon-container">
                        <span className="block cpn-icon" onMouseDown = { (e) => { mouseDownTrigger(e, "block") }} style={{ backgroundImage: "url(/assets/cpn/block.png)" }}></span>
                    </div>
                    <div className="cpn-icon-container">
                        <span className="block cpn-icon" onMouseDown = { (e) => { mouseDownTrigger(e, "flex") }} style={{ backgroundImage: "url(/assets/cpn/flexible.png)" }}></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
