import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import $ from 'jquery';

import Close from '../close';
import { id } from '../../useful';
import dataTypes from './data-types';

export default (props) => {

    const { closeBox, table, addField } = props;
    const [ data, setData ] = useState({});
    const [ types, setTypes ] = useState([]);
    const [ type, setType ] = useState({});
    const [ height, setHeight ] = useState(0);
    const unique_string = useSelector(state => state.unique_string);

    useEffect(() => {
        setTypes( dataTypes )
    }, [])

    const dataTypeChange = (e) => {
        const { value } = e.target;
        setData({ ...data, field_data_type: value })
        setType({...type, name: value})
        if( value ){
            const filtedTypes = dataTypes.filter( type => type.name.toLowerCase().includes(value.toLowerCase()) );
            setTypes( filtedTypes );
        }else{
            setTypes( dataTypes );
        }
    }
    /* Data type UI changes corresponding  */

    const submit = () => {
        fetch(`/api/${ unique_string }/database/alter/table`, {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({ table_id: table.table_id, field:  { ...data, data_type: type.name } })
        }).then( res => res.json() ).then( data => {
            addField( data.field );
        })

        closeBox();
    }

    const generateDemoDecNumber = () => {
        if( type.type == "floating-point" ){
            if( data.props ){
                const { length, pointAt } = data.props;
                const l = parseInt( length )
                const p = parseInt( pointAt )
                if( l > p && l > 0 && p > 0)
                    return `${"9".repeat(l - p)},${ "9".repeat(p) }`
                else
                    return ``
            }
        }
    }

    return(
        <div className="fixed-default fullscreen trans-dark z-index-9 flex flex-middle">

            <div className="w-50-pct bg-white border-radius-12-px rel" style={{ minHeight: "400px", minWidth: "768px" }}>
                <div className="abs t-0 r-0">
                    <Close triggered={closeBox}/>
                </div>
                <div className="flex">
                    <div className="p-1 w-100-pct">
                        <div>
                            <label className="block text-16-px">Tên trường</label>
                            <input value={ data.field_alias } onChange={
                                (e) => { setData({ ...data, field_alias: e.target.value }) }
                            } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text"/>
                        </div>
                        <div className="m-t-1">
                            <label className="block text-16-px">Kiểu dữ liệu</label>
                            <input onFocus={ () => { setHeight(200) } } value={ type.name } onChange={ dataTypeChange } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text"/>
                            { types ?
                                <div className="rel w-100-pct">
                                    <div className="drop-input" style={{ height: `${ height }px` }}>
                                        <div className="drop-container">
                                            { types.map( type =>
                                                <div className="w-100-pct" onClick={() => { setType(type); setHeight(0) } } key={ type.id }>
                                                    <span className="block p-0-5 hover pointer">{ type.name }</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            : null }
                        </div>
                        { type ?
                            <div className="block m-t-1">
                                { type.type === "int" ?
                                    <div className="m-t-1">
                                        <span>Số nguyên có giá trị trong khoảng { type.range.min } ~ { type.range.max }</span>
                                    </div>
                                : null
                                }

                                <div className="m-t-1 flex flex-no-wrap">
                                    <div className="w-50-pct flex flex-no-wrap flex-aligned">
                                        <div>
                                            <input onChange={
                                                (e) => { setData({ ...data, is_primary: !data.is_primary }) }
                                            } className="block w-18-px" checked={ data.is_primary ? "checked": "" } style={{ height: "18px" }} type="checkbox"/>
                                        </div>
                                        <div className="label m-l-0-5">
                                            <span className="block">Primary key</span>
                                        </div>
                                    </div>
                                    <div className="w-50-pct flex flex-no-wrap flex-aligned">
                                        <div>
                                            <input onChange={
                                                (e) => { setData({ ...data, is_nullable: !data.is_nullable }) }
                                            } className="block w-18-px" checked={ data.is_nullable ? "checked": "" } style={{ height: "18px" }} type="checkbox"/>
                                        </div>
                                        <div className="label m-l-0-5">
                                            <span className="block">NOT NULL</span>
                                        </div>
                                    </div>
                                </div>

                                {
                                    type.type === "char" ?
                                    <div className="m-t-1 flex flex-no-wrap">
                                        <div className="w-50-pct flex flex-wrap flex-aligned p-r-1">
                                            <div className="label m-r-0-5">
                                                <span className="block">Độ dài</span>
                                            </div>
                                            <div className="w-100-pct">
                                                <input onChange={
                                                    (e) => { setData({ ...data, props: { length: e.target.value } }) }
                                                } type="text" className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px"/>
                                            </div>
                                        </div>
                                        <div className="w-50-pct flex flex-wrap flex-aligned p-l-1">
                                            <div className="label m-r-0-5">
                                                <span className="block">Mặc định</span>
                                            </div>
                                            <div className="w-100-pct">
                                                <input onChange={
                                                    (e) => { setData( {...data, default: e.target.value} ) }
                                                } type="text" className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px"/>
                                            </div>
                                        </div>
                                    </div>
                                : null
                                }


                                {
                                type.type === "floating-point" ?
                                    <div>
                                        <div className="m-t-1 flex flex-no-wrap">
                                            <div className="w-50-pct flex flex-wrap flex-aligned p-r-1">
                                                <div className="label m-r-0-5">
                                                    <span className="block">Độ dài</span>
                                                </div>
                                                <div className="w-100-pct">
                                                    <input onChange={
                                                        (e) => { setData({ ...data, props: { ...data.props, length: e.target.value } }) }
                                                    } type="number" className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px"/>
                                                </div>
                                            </div>
                                            <div className="w-50-pct flex flex-wrap flex-aligned p-l-1">
                                                <div className="label m-r-0-5">
                                                    <span className="block">Vị trí dấu thập phân</span>
                                                </div>
                                                <div className="w-100-pct">
                                                    <input onChange={
                                                        (e) => { setData( {...data, props: { ...data.props, pointAt: e.target.value } } ) }
                                                    } type="number" className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px"/>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="block m-t-1">Preview: { generateDemoDecNumber() }</span>
                                    </div>
                                : null
                                }


                                {
                                    type.type === "text" ?
                                    <div className="m-t-1 flex flex-no-wrap">
                                        <div className="w-100-pct flex flex-wrap flex-aligned">
                                            <div className="label m-r-0-5">
                                                <span className="block">Mặc định</span>
                                            </div>
                                            <div className="w-100-pct">
                                                <textarea onChange={
                                                    (e) => { setData( {...data, default: e.target.value} ) }
                                                } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px"/>
                                            </div>
                                        </div>
                                    </div>
                                : null
                                }

                            </div>
                            : null
                        }

                    </div>
                </div>
                <div className="p-0-5 abs b-0 r-0">
                    <button onClick={ submit } className="bg-deep-gray border-radius-8-px block ml-auto p-l-1 p-r-1 p-t-0-5 p-b-0-5 no-border pointer">Xuất bản</button>
                </div>
            </div>
        </div>
    )
}
