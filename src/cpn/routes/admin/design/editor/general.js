import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
export default (props) => {
    const initialPage = useSelector( state => state.page )
    const [ page, setPage ] = useState(initialPage)

    useEffect(() => {
        setPage(initialPage)
    }, [initialPage])
    const submit = () => {

    }

    return(
        <div>
        { page ?
            <div className="p-2">
                <div className=" flex flex-no-wrap">
                    <label className="block w-30-pct text-16-px">Tiêu đề</label>
                    <input value={ page.title } onChange={
                        (e) => { setPage({ ...page, title: e.target.value }) }
                    } className="block w-65-pct p-0-5 border-1 border-radius-8-px" type="text"/>
                </div>
                <div className="m-t-1 flex flex-no-wrap">
                    <label className="block w-30-pct text-16-px">Đường dẫn (URL)</label>
                    <input value={ page.url } onChange={
                        (e) => { setPage({ ...page, url: e.target.value }) }
                    } className="block w-65-pct p-0-5 border-1 border-radius-8-px" type="text"/>
                </div>
                <div className="m-t-1 flex flex-no-wrap">
                    <label className="block w-30-pct text-16-px">Mô tả</label>
                    <textarea value={ page.description } onChange = {
                        (e) => { setPage({ ...page, description: e.target.value }) }
                    } className="block w-65-pct p-0-5 border-1 border-radius-8-px" type="text"/>
                </div>                
            </div>
        : null}
        </div>
    )
}
