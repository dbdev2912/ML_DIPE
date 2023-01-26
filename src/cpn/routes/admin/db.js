import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import HorizonBar from './layout/horizon-bar';
import VerticalBar from './layout/vertical-bar';
import TableEdittor from '../../widgets/table-edittor';
import TableAdd from '../../widgets/hidden-box-add-table';

export default () => {

    const unique_string = useSelector( state => state.unique_string );
    const [ tables, setTables ] = useState([]);
    const [ currentTable, setCurrentTable ] = useState({});
    const [ hiddenBox, setHiddenBox ] = useState(false)

    useEffect(() => {
        fetch(`/api/${unique_string}/database/tables`).then(res => res.json())
        .then( data => {
            setTables( data.tables );
            setCurrentTable(data.tables? data.tables[0] : {});
        })
    }, []);

    const addNewTable = (table) => {
        fetch(`/api/${unique_string}/database/tables`, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify( { table } )
        }).then(res => res.json())
        .then( data => {
            const { table_id, field } = data;
            console.log(field)
            setTables([ ...tables, { ...table, table_id, fields: [ field ] } ])
        })
    }

    const updateTable = (table) => {
        const tb = tables.filter( t => t.table_id === table.table_id )[0];

        const index = tables.indexOf( tb );
        tables[index] = table;
        setCurrentTable( table )
        setTables( [ ...tables ] )
    }
    const removeTable = ( table ) => {
        const tb = tables.filter( t => t.table_id != table.table_id );
        setCurrentTable( tb.length > 0 ? tb[0] : {} )
        setTables( [ ...tb ] )
    }

    return(
        <div>
            <HorizonBar />
            <VerticalBar />
            <div className="app-p-300">

                <div className="w-100-pct flex flex-no-wrap" style={{ minHeight: "100vh" }}>
                    <div className="w-25-pct border-1-right">
                        <div className="w-100-pct bg-deep-gray flex flex-no-wrap">
                            <div>
                                <span className="text-16-px p-0-5 block">BẢNG</span>
                            </div>
                            <div className="ml-auto flex flex-middle m-r-0-5">
                                <button className="bg-white block text-20-px pointer bold no-border border-radius-8-px" onClick={ () => { setHiddenBox( !hiddenBox ) } }>+</button>
                            </div>
                        </div>

                        { tables.map( table =>
                            <div className="w-100-pct flex flex-no-wrap" key={ table.table_id } onClick={ () => { setCurrentTable( table ) } }>
                                <div className="hover w-100-pct m-b-0-5 border-bottom-1 pointer">
                                    <span className="text-16-px p-0-5 block upper">{ table.table_alias }</span>
                                </div>
                            </div>
                        )}

                    </div>
                    <div className="w-75-pct">
                    { tables.length > 0 &&
                        <TableEdittor tables={ tables } currentTable={ currentTable } updateTable={ updateTable } removeTable={ removeTable }/>
                     }

                    </div>
                </div>
            </div>

            { hiddenBox ? <TableAdd closeBox={ () => { setHiddenBox( !hiddenBox ) } } addNewTable={ addNewTable }/> : null }

        </div>
    )
}
