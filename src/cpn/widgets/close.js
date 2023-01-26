export default (props) => {
    const { triggered } = props;

    return(
        <div className="close" onClick={ triggered }>            
            <span className="icon"/>
        </div>
    )
}
