import { useState, useEffect } from 'react';

export default (props) => {
    const { style, propChange, defaultValue } = props;
    const [ value, setValue ] = useState(defaultValue)

    const changeTrigger = (e) => {
        setValue(e.target.value)
        propChange( style.prop, e.target.value )
    }

    return (
        <div className="w-100-pct">
            <input type={ style.inputType } onChange = { changeTrigger } value={ value } className="block w-65-pct border-1"/>
        </div>
    )
}
