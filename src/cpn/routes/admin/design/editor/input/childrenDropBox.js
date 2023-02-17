import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import $ from 'jquery';

import DropBox from './dropbox';
import ColorInput from './color';
import StringInput from './string';

export default (props) => {

    const { defaultStyle } = useSelector( state => state );
    const { propChange, styles } = props;

    const renderInput = (style, defaultValue) => {
        switch (style.inputType) {
            case "color":
                return <ColorInput defaultValue={ defaultValue } style = { style } propChange = { propChange }/>
                break;
            case "dropbox":
                return <DropBox defaultValue={ defaultValue } style={ style } propChange = { propChange }/>
                break;
            default:
                return <StringInput defaultValue={ defaultValue } style = { style } propChange = { propChange }/>
        }
    }

    const clickTrigger = ( value ) => {

    }

    return(
        <div className="dropbox w-100-pct rel">
            <div className="rel">
                <div className="w-100-pct">
                    <div>
                    { styles.map( style =>
                        <div className="block w-100-pct p-1 flex flex-no-wrap">
                            <div className="w-50-pct flex flex-aligned">
                                <span className="block w-100-pct p-l-2">{ style.label }</span>
                            </div>
                            <div className="w-50-pct flex flex-aligned">
                                { renderInput( style, defaultStyle[ style.prop ] ) }
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}
