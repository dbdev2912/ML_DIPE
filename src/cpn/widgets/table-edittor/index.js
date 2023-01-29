import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import HiddenAddFieldBox from '../hidden-box-add-field';
import HiddenEditFieldBox from '../hidden-box-edit-field';
import HiddenAddFKBox from '../hidden-box-add-fk';
import HiddenTableEditBox from '../hidden-box-edit-table';
import HiddenFKEditBox from '../hidden-box-edit-fk';

export default (props) => {
    const { currentTable, updateTable, removeTable } = props;
    const [ table, setTable ] = useState( currentTable );
    const [ fks, setFKs ] = useState([]);
    const [ hiddenTableEditBox, setHiddenTableEditBox ] = useState(false);
    const [ hiddenFKEdit, setHiddenFKEdit ] = useState(false);
    const [ addBox, setAddBox ] = useState(false);
    const [ editBox, setEditBox ] = useState(false);
    const [ currentEdittingField, setCurrentEdittingField ] = useState({})
    const [ currentEdittingFK, setCurrentEdittingFK ] = useState({})

    const [ fkAdd, setFkAdd ] = useState(false);
    const unique_string = useSelector( state => state.unique_string );

    useEffect(() => {
        setTable(currentTable);
        fetch(`/api/${unique_string}/database/table/foreigns/${currentTable.table_id}`)
        .then( res => res.json() ).then( data => {
            const { fields } = data;
            console.log( fields )
            setFKs(fields);
        })
    }, [ currentTable ])

    const addField = ( field ) => {
        const { fields } = table;
        if( fields ){
            setTable({ ...table, fields: [...fields, field] })
            updateTable( { ...table, fields: [...fields, field] } )
        }else{
            setTable({ ...table, fields: [ field ] })
            updateTable( { ...table, fields: [ field ] } )
        }
    }

    const addFKtoTable = ( fk ) => {
        setFKs([...fks, fk])
    }

    const editTriggered = ( field ) =>{
        setCurrentEdittingField( field );
        console.log(field)
        setEditBox( !editBox )
    }

    const removeField = ( field_id ) => {
        const newFields = table.fields.filter( f => f.field_id != field_id );
        setTable( {...table, fields: [...newFields]  } )
        updateTable( {...table, fields: [...newFields]  } )
    }

    const editField = ( field ) => {
        const originField = table.fields.filter( f => f.field_id === field.field_id )[0];
        const index = table.fields.indexOf( originField );
        table.fields[index] = field;
        setTable({...table})
        updateTable({ ...table })
    }

    const renderUnit = ( field ) => {
        if( field.field_props ){
            const props = JSON.parse(field.field_props) ;
            const dataType = field.field_data_type.toLowerCase();
            if( dataType.includes("char") ){
                return <span>({ props.length })</span>
            }
            if( dataType.includes("dec") ){
                return <span>({ props.length }, { props.pointAt })</span>
            }
        }
        else{
            return null
        }
    }

    const updateFK = ( fk ) => {
        fks[ fk.index ] = fk;
        console.log( fks )
        setFKs([ ...fks ])
    }

    return (
        <div>
        { table ?
            <div className="p-1 w-100-pct">
                <div className="flex flex-no-wrap">
                    <span className="text-28-px underline-fit">{ table.table_alias }</span>
                    <div className="flex flex-middle pointer ml-auto m-r-0-5"
                        onClick = { () => { setHiddenTableEditBox( !hiddenTableEditBox ) } }
                    >
                        <img src="/assets/icon/edit.png" className="block w-24-px"/>
                    </div>
                </div>
                <div className="w-100-pct mg-auto m-t-1 border-1">
                    <div className="w-100-pct bg-deep-gray flex flex-no-wrap">
                        <div>
                            <span className="text-16-px p-0-5 block">Các trường</span>
                        </div>
                        <div className="ml-auto flex flex-middle m-r-0-5" onClick={ () => { setAddBox(!addBox) } }>
                            <button className="bg-white block text-20-px pointer bold no-border border-radius-8-px">+</button>
                        </div>
                    </div>
                </div>

                <div className="w-100-pct bg-gray flex flex-no-wrap">
                    <div className="w-25-pct">
                        <span className="block p-0-5 text-16-px">Tên trường</span>
                    </div>
                    <div className="w-25-pct">
                        <span className="block p-0-5 text-16-px">Kiểu dữ liệu</span>
                    </div>
                    <div className="w-25-pct flex-middle">
                        <span className="block text-center p-0-5 text-16-px">NOT NULL</span>
                    </div>
                    <div className="w-25-pct flex-middle">
                        <span className="block text-center p-0-5 text-16-px">Khoá chính</span>
                    </div>
                </div>
                <div>
                    { table.fields && table.fields.map( (field) =>
                        <div className="w-100-pct border-1-bottom flex flex-no-wrap hover pointer" key={ field.field_id } onClick={ () => { editTriggered(field) } }>
                            <div className="w-25-pct">
                                <span className="block p-0-5 text-16-px">{ field.field_alias }</span>
                            </div>
                            <div className="w-25-pct">
                                <span className="block p-0-5 text-16-px">{ field.field_data_type }{ renderUnit( field ) }</span>
                            </div>
                            <div className="w-25-pct flex flex-middle">
                                <input type="checkbox" checked = { field.nullable == true ? "checked" : ""}/>
                            </div>
                            <div className="w-25-pct flex flex-middle">
                                <input type="checkbox" checked = { field.is_primary ? "checked" : ""}/>
                            </div>
                        </div>
                        )

                    }
                </div>

                <div>
                    <div className="w-100-pct mg-auto m-t-3 border-1">
                        <div className="w-100-pct bg-deep-gray flex flex-no-wrap">
                            <div>
                                <span className="text-16-px p-0-5 block">Các khoá ngoại</span>
                            </div>
                            <div className="ml-auto flex flex-middle m-r-0-5" onClick={ () => { setFkAdd( !fkAdd ) } }>
                                <button className="bg-white block text-20-px pointer bold no-border border-radius-8-px">+</button>
                            </div>
                        </div>
                    </div>

                    <div className="w-100-pct bg-gray flex flex-no-wrap">
                        <div className="w-25-pct">
                            <span className="block p-0-5 text-16-px">STT</span>
                        </div>
                        <div className="w-25-pct">
                            <span className="block p-0-5 text-16-px">Trường</span>
                        </div>
                        <div className="w-25-pct">
                            <span className="block p-0-5 text-16-px">Trên bảng</span>
                        </div>
                        <div className="w-25-pct">
                            <span className="block p-0-5 text-16-px">Trên trường</span>
                        </div>
                    </div>
                    <div>
                        { fks.length > 0 ? fks.map( (fk, index) =>
                            <div className="w-100-pct border-1-bottom flex flex-no-wrap hover pointer" key={ fk.key_id } onClick={ () => { setHiddenFKEdit( !hiddenFKEdit ); setCurrentEdittingFK( { ...fk, index } ) } }>
                                <div className="w-25-pct">
                                    <span className="block p-0-5 text-16-px">{ index + 1 }</span>
                                </div>
                                <div className="w-25-pct">
                                    <span className="block p-0-5 text-16-px">{ fk.field.field_alias }</span>
                                </div>
                                <div className="w-25-pct">
                                    <span className="block p-0-5 text-16-px">{ fk.reference.table_alias }</span>
                                </div>
                                <div className="w-25-pct">
                                    <span className="block p-0-5 text-16-px">{ fk.on.field_alias }</span>
                                </div>
                            </div>
                            )
                            :
                            <div className="w-100-pct border-1-bottom p-1">
                                <span className="text-18-px block italic text-center">Chưa có khoá ngoại</span>
                            </div>
                        }
                    </div>
                </div>
                { hiddenTableEditBox ? <HiddenTableEditBox table={ table } updateTable = { updateTable } removeTable={ removeTable } closeBox = { () => { setHiddenTableEditBox( !hiddenTableEditBox) } } /> : null }
                { addBox ? <HiddenAddFieldBox table={ table } addField={ addField } closeBox={ () => { setAddBox( !addBox ) } } /> : null }
                { fkAdd ?  <HiddenAddFKBox tables={ props.tables } table={ table } addFKtoTable={ addFKtoTable } closeBox={ () => { setFkAdd( !fkAdd ) } }/> : null}
                { hiddenFKEdit ? <HiddenFKEditBox tables={ props.tables } table={ table } fk = { currentEdittingFK } updateFK={ updateFK } closeBox = { () => { setHiddenFKEdit( !hiddenFKEdit) } } /> : null }
                { editBox ? <HiddenEditFieldBox table={ table } removeField={ removeField } field={ currentEdittingField } editField={ editField } closeBox={ () => { setEditBox( !editBox ) } } /> : null }
            </div>
            :null }
        </div>
    )
}
