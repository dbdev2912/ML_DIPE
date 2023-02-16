import { id } from '../../cpn/useful';

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
            return chosingBlockOrContent( state, action )
            break;
        case "setCurrentEditingBlock":
            return setCurrentEditingBlock(state, action);
            break;

        case "styleChange":
            return styleChange(state, action);
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


const chosingBlockOrContent = (state, action) => {
    const { selectedBlock } = state;

    const blocks = [ "block", "flex" ]
    const contents = [ "text" ]
    if( blocks.indexOf( selectedBlock ) != -1  ){
        return addNewBlock(state, action);
    }else{
        return addNewContent(state, action);
    }
}

const addNewBlock = (state, action) => {
    const { currentMouseOn, selectedBlock, elements } = state;

    const addNode = (id, nodes, newNode) => {
        nodes.map( node => {

            if( node.id === id ){
                const { children } = node
                if( children ){
                    children.push( newNode )
                }else{
                    node.children = [ newNode ]
                }
                return
            }else{
                if( node.children !== undefined ){
                    return addNode( id, node.children, newNode )
                }
            }
        })
    }

    addNode( currentMouseOn, elements.children, { id:  id(), type: selectedBlock, style: { display: selectedBlock, width: "100%", height: "100px" },children: [] })
    return { ...state, elements };
}

const addNewContent = (state, action) => {
    const { currentMouseOn, selectedBlock, elements } = state;

    const addNode = (id, nodes, newNode) => {
        nodes.map( node => {

            if( node.id === id ){
                const { children } = node
                if( children ){
                    children.push( newNode )
                }else{
                    node.children = [ newNode ]
                }
                return
            }else{
                if( node.children !== undefined ){
                    return addNode( id, node.children, newNode )
                }
            }
        })
    }

    addNode( currentMouseOn, elements.children, { id:  id(), type: selectedBlock, style: { display: "block", width: "100%", height: "100px" }, content: "Lorem ispum"})
    return { ...state, elements };
}


const setCurrentEditingBlock = ( state, action ) =>{
    const { id } = action.payload;
    /* set de fucking default value to dis */
    const { elements } = state;
    let style = {};
    const getStyle = (id, nodes) => {
        nodes.map( node => {
            if( node.id === id ){
                style = { ...node.style }
                return
            }else{
                if( node.children !== undefined ){
                    return getStyle(  id, node.children );
                }
            }
        })
    }
    getStyle(id, elements.children)

    return { ...state, currentEditingBlock: id, defaultStyle: style }
}

const styleChange = ( state, action ) => {
    const { name, value } = action.payload;
    const { currentEditingBlock, elements } = state;

    const modifyNode = ( nodes, id, name, value ) => {
        nodes.map( node => {
            if( node.id === id ){
                const style = { ...node.style };
                style[name] = value;
                node.style = { ...style }
                return
            }else{
                if( node.children !== undefined ){
                    return modifyNode( node.children, id, name, value )
                }
            }
        })
    }
    modifyNode( elements.children, currentEditingBlock, name, value );
    return { ...state, elements };
}
