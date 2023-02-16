export default (type) => {
    switch(type){
        case "block":
            return <span className="block cpn-icon" style={{ backgroundImage: "url(/assets/cpn/block.png)" }}></span>
            break;
        case "flexible":
            return <span className="block cpn-icon" style={{ backgroundImage: "url(/assets/cpn/flexible.png)" }}></span>
            break;
        case "text":
            return <span className="block cpn-icon" style={{ backgroundImage: "url(/assets/cpn/text.png)" }}></span>
            break;
        default:
            <span className="block cpn-icon" style={{ backgroundImage: "url(/assets/cpn/null.png)" }}></span>
    }
}
