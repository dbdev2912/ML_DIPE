import { useState, useEffect } from 'react';
import $ from 'jquery';

export default (props) => {


    const { style, propChange, defaultValue } = props;
    const [ value, setValue ] = useState( defaultValue );
    const [ height, setHeight ] = useState(0);

    const blurTrigger = (e) => {
        e.preventDefault();
        setTimeout(() => {
            setHeight(0)
        }, 200)
    }

    const clickTrigger = ( value ) => {
        setValue(value)
        propChange( style.prop, value )
    }

    return(
        <div className="dropbox w-65-pct rel">
            <input className="block w-100-pct p-0-5 border-1 border-radius-8-px" value={ value } onFocus={ () => { setHeight(200) } } onBlur={ (e)=>{ blurTrigger(e) } }/>
            <div className="rel">
                <div className="abs-default z-index-5 w-100-pct no-overflow" style={{ height: `${height}px` }}>
                    <div style={{ height: `${height}px`, overflowY: "scroll" }}>
                    { style.values.map( val =>
                        <div>
                            <span className="block p-0-5 bg-white pointer hover" onClick={ () => { clickTrigger(val) } }>{ val }</span>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}
