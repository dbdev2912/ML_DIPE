import { useSelector, useDispatch } from 'react-redux';
import selector from './selector';
export default (props) => {
    const { x, y } = useSelector(state => state.axis);
    const { showBar, hideBar, selectedBlock } = useSelector( state => state );

    const dispatch = useDispatch()
    const mouseUpTrigger = (e) => {
        const { pageX, pageY } = e;
        dispatch({
            branch: "editor",
            type: "setAxis",
            payload: {
                x: pageX, y: pageY,
                mouseState: "up",
            }
        })
        dispatch({
            branch: "editor",
            type: "addNewBlock"
        })
        showBar();
    }

    const mouseDownTrigger = (e) => {
        const { pageX, pageY } = e;
        hideBar()
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
        <div className="cpn-icon-container flex flex-middle border-1 fixed z-index-5 bg-white " style={{ left: `${x}px`, top: `${y}px` }} onMouseUp={ mouseUpTrigger } onMouseDown={ mouseDownTrigger }>
            { selector(selectedBlock) }
        </div>
    )
}
