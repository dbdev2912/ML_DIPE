export default (state, action) => {
    switch( action.type ){
        case "setPage":
            return setPage(state, action);
            break;

        case "setAxis":
            return setAxisFuncs(state, action);
            break;

        case "setSelectedBlock":
            return setSelectedBlock(state, action);
            break;

        case "setCurrentMouseOn":
            return setCurrentMouseOn(state, action);
            break;

        case "addNewBlock":
            return addNewBlock(state, action);
            break;

        default:
            return state;
            break;
    }
}


const setPage = (state, action) => {
    const { page, hideBar, showBar } = action.payload;
    return { ...state, page, hideBar, showBar }
}

const setAxisFuncs = ( state, action) => {
    const { x, y, mouseState } = action.payload;
    return { ...state, axis: { x, y, mouseState } }
}

const setSelectedBlock = ( state, action ) => {
    const { blockType } = action.payload;
    return { ...state, selectedBlock: blockType }
}

const setCurrentMouseOn = ( state, action ) => {
    const { id } = action.payload
    return { ...state, currentMouseOn: id }
}

const addNewBlock = (state, action) => {
    const { currentMouseOn, selectedBlock } = state;
    console.log( { currentMouseOn, selectedBlock } );
    return state;
}
