import { useState, useEffect } from 'react';
import $ from 'jquery';

export default (props) => {

    const [ height, setHeight ] = useState(0);

    const { label, url, items  } = props.box;

    const dropTriggered = (e) => {
        if( items ){
            if( height === 0 ){
                const itemsHeight = $(e.target).closest('.dropbox').find('.dropbox-container').height();
                setHeight( itemsHeight );
            }else{
                setHeight(0)
            }
        }
    }

    return(
        <div className="dropbox border-1-bottom">
            <div className="flex flex-aligned p-1 pointer" onClick={ (e) => { dropTriggered(e) } }>
                <a href={ url } className="block text-12-px dropbox-label">{ label }</a>
                { items ?
                    <span className="drop-arrow"/>
                     : null
                }
            </div>
            <div className="no-overflow" style={{ height: `${height}px` }}>
                <div className="dropbox-container">
                { items ?
                    items.map( item =>
                        <div className="item text-12-px" key ={ item.id }>
                            <a href={ item.url }>{ item.label }</a>
                        </div>

                    )
                     : null
                }
                </div>
            </div>
        </div>
    )
}
