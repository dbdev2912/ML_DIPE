import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import $ from 'jquery';

import Close from '../close';
import { id } from '../../useful';
export default (props) => {

    const { closeBox, table, updateTable, removeTable } = props;
    const [ data, setData ] = useState(table);

    const unique_string = useSelector(state => state.unique_string);

    useEffect(() => {

    }, [])


    const submitUpdate = () => {
        fetch(`/api/${ unique_string }/database/modify/table`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify( { table: data } )
        }).then(  res => res.json() ).then( resp => {
            console.log( resp )
            updateTable({ ...data })
        })
        closeBox();
    }
    const submitDelete = () => {
        closeBox();
        removeTable( data );
        fetch(`/api/${ unique_string }/database/drop/table`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify( { table_id: data.table_id } )
        }).then(res => res.json()).then( resp => {
            
        })
    }

    return(
        <div className="fixed-default fullscreen trans-dark z-index-9 flex flex-middle">

            <div className="w-50-pct bg-white border-radius-12-px rel" style={{ minHeight: "400px", minWidth: "768px" }}>
                <div className="abs t-0 r-0">
                    <Close triggered={closeBox}/>
                </div>
                <div className="flex">
                    <div className="p-1 w-100-pct">
                        <span className="text-24-px">Chỉnh sửa</span>

                        <div className="m-t-2">
                        <input value={ data.table_alias }
                        onChange={
                            (e) => { setData({ ...data, table_alias: e.target.value }) }
                        }
                        onKeyUp = {
                            (e) => { if( e.keyCode === 13 ){ submitUpdate() } }
                        }
                         className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text"/>

                        </div>
                    </div>
                </div>
                <div className="p-0-5 abs flex b-0 r-0">
                    <button onClick={ submitDelete } className="bg-crimson border-radius-8-px block ml-auto p-l-1 p-r-1 p-t-0-5 p-b-0-5 no-border pointer">Xoá bảng</button>
                    <button onClick={ submitUpdate } className="bg-deep-gray border-radius-8-px block m-l-1 p-l-1 p-r-1 p-t-0-5 p-b-0-5 no-border pointer">Xuất bản</button>
                </div>
            </div>
        </div>
    )
}
