import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
export default (props) => {
    const initialPage = useSelector( state => state.page )

    const { elements } = useSelector( state => state );

    const [ page, setPage ] = useState(initialPage)
    const API_URL = "http://192.168.15.205:5000/api/hihi/saveJson/add"
    useEffect(() => {
        setPage(initialPage)
    }, [initialPage]);


    const submit = () => {
        console.log(elements)
        fetch(API_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ data: elements })
        })
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
                <div className="m-t-2">
                    <button onClick={ submit }>Submit JSON</button>
                </div>
            </div>
        : null}
        </div>
    )
}
