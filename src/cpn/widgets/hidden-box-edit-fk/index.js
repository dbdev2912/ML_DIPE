import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import $ from 'jquery';

import Close from '../close';
import { id } from '../../useful';

export default (props) => {

    const { closeBox, fk, table, tables, updateFK } = props;
    const [ data, setData ] = useState(fk);


    const [ height_1, setHeight_1 ] = useState(0);
    const [ height_2, setHeight_2 ] = useState(0);
    const unique_string = useSelector(state => state.unique_string);

    useEffect(() => {

    }, [])

    const submitUpdate = () => {
        fetch(`/api/${ unique_string }/database/modify/foreign/key`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ key: data})
        }).then( res => res.json() ).then((resp) => {
            updateFK(data);
        })
        closeBox(); /* SERVER SIDE CODING*/
    }

    const submitDelete = () => {
        closeBox();
    }

    return(
        <div className="fixed-default fullscreen trans-dark z-index-9 flex flex-middle">

            <div className="w-50-pct bg-white border-radius-12-px rel" style={{ minHeight: "400px", minWidth: "768px" }}>
                <div className="abs t-0 r-0">
                    <Close triggered={closeBox}/>
                </div>
                <div className="flex">
                    <div className="p-1 w-100-pct">
                        <div className="m-t-1">
                            <label className="block text-16-px">Trường trên { table.table_alias.toUpperCase() }</label>
                            <input value={ data.field && data.field.field_alias } onFocus={ () => { setHeight_1(200) } } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text" spellCheck="false"/>
                            { table.fields ?
                                <div className="rel w-100-pct z-index-10">
                                    <div className="drop-input" style={{ height: `${ height_1 }px` }}>
                                        <div className="drop-container">
                                            { table.fields.map( field =>
                                                <div className="w-100-pct" onClick={() => { setHeight_1(0); setData({ ...data, field: field }) } } key={ field.field_id }>
                                                    <span className="block p-0-5 hover pointer">{ field.field_alias }</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            : null }
                        </div>

                        <div className="m-t-1">
                            <label className="block text-16-px">Trường trên (các) bảng chứa khoá ngoại</label>
                            <input value={ data.reference && `${ data.reference.table_alias } - ${ data.on.field_alias }` } onFocus={ () => { setHeight_2(200) } } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text" spellCheck="false"/>
                            { tables ?
                                <div className="rel w-100-pct z-index-9">
                                    <div className="drop-input" style={{ height: `${ height_2 }px` }}>
                                        <div className="drop-container">
                                        { tables && tables.map( tb =>
                                            <React.StrictMode>
                                            { tb.fields && tb.table_id != table.table_id && tb.fields.map( field =>
                                                <div className="w-100-pct" onClick={() => { setHeight_2(0); setData({ ...data, reference: tb, on: field }) } } key={ field.field_id }>
                                                    <span className="block p-0-5 hover pointer">{ tb.table_alias } - { field.field_alias }</span>
                                                </div>
                                            )}
                                            </React.StrictMode>
                                        )}
                                        </div>
                                    </div>
                                </div>
                            : null }
                        </div>

                    </div>
                </div>
                <div className="p-0-5 abs flex b-0 r-0">
                    <button onClick={ submitDelete } className="bg-crimson border-radius-8-px block ml-auto p-l-1 p-r-1 p-t-0-5 p-b-0-5 no-border pointer">Bỏ khoá</button>
                    <button onClick={ submitUpdate } className="bg-deep-gray border-radius-8-px block m-l-1 p-l-1 p-r-1 p-t-0-5 p-b-0-5 no-border pointer">Xuất bản</button>
                </div>
            </div>
        </div>
    )
}
