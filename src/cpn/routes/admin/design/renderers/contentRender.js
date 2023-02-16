import { useSelector, useDispatch } from 'react-redux';

export default (elt, setCurrentEditing, mouseEnterTrigger, currentMouseOn, currentEditingBlock ) => {

    return(
        <span
        high-light={ elt.id === currentMouseOn ? "true" : "false" }
        high-light-edit={ elt.id === currentEditingBlock ? "true" : "false" }
        style={ elt.style } onMouseEnter={ (e) => { mouseEnterTrigger(e, elt) } }
        onClick={ () => { setCurrentEditing(elt.id) } }

        >
            { elt.content }
        </span>
    )
}
