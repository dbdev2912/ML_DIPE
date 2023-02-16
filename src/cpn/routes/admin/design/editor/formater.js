import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import cssData from './css-props';
import DropBox from './input/dropbox';
import ColorInput from './input/color';
import StringInput from './input/string';
export default (props) => {
    const dispatch = useDispatch()
    const { css } = cssData;
    const { defaultStyle, currentEditingBlock } = useSelector( state => state );
    const propChange = (name, value) => {
        dispatch({
            branch: "editor",
            type: "styleChange",
            payload: {
                name, value
            }
        })
    }

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

    return(
        <React.StrictMode>
        {  currentEditingBlock ?
            <div style={{ height: "90vh", overflow: "auto" }}>
                { css.map( style =>
                    <div className="block w-100-pct p-1 flex flex-no-wrap">
                        <div className="w-50-pct flex flex-aligned">
                            <span>{ style.prop }</span>
                        </div>
                        <div className="w-50-pct flex flex-aligned">
                            { renderInput( style, defaultStyle[ style.prop ] ) }
                        </div>
                    </div>
                )}
            </div>
        :
            <div style={{ height: "90vh", overflow: "auto" }}>
                <span className="block w-100-pct text-center">Bạn chưa chọn một khối nào để thao tác !</span>
                <span className="block w-100-pct text-center">Chọn một cục rồi quay lại đây nói chiện tiếp</span>
            </div>

        }
        </React.StrictMode>
    )
}
