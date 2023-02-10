import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HorizonBar from '../layout/horizon-bar';
import VerticalBar from '../layout/vertical-bar';
import $ from 'jquery';
import { id } from '../../../useful';


export default () => {
    const [ vh, setVH ] = useState(70);
    const unique_string = useSelector(state => state.unique_string);
    const [ data, setData ] = useState({})
    useEffect(()=> {
        setVH( window.innerHeight - $("#horizon-bar").height() - 52 );
        $(window).on("resize", () => {
            setVH( window.innerHeight - $("#horizon-bar").height() - 52 );
        })

    }, [])

    const submit = () => {
        const page_id = id()
        fetch(`/api/${ unique_string }/page/add`, {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ page: {page_id, ...data} })
        }).then( res => res.json() ).then( (data) => {
            const { success } = data;
            window.location = `/ml-admin/design/page/edit/${ page_id }`
        })
    }

    return(
        <div>
            <HorizonBar />
            <VerticalBar />
            <div className="p-2 app-p-300">
                <div className="w-100-pct m-l-1 p-1 scroll-y shadow" style={{ height: `${vh}px` }}>
                    <div className="flex flex-no-wrap">
                        <div className="p-0-5">
                            <span className="text-32-px block">TRANG MỚI</span>
                        </div>
                    </div>
                    <div className="w-50-pct p-0-5">
                        <div>
                            <div>
                                <label className="block text-16-px">Tiêu đề</label>
                                <input value={ data.title } onChange={
                                    (e) => { setData({ ...data, title: e.target.value }) }
                                } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text"/>
                            </div>
                            <div className="m-t-1">
                                <label className="block text-16-px">Đường dẫn (URL)</label>
                                <input value={ data.url } onChange={
                                    (e) => { setData({ ...data, url: e.target.value }) }
                                } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text"/>
                            </div>
                            <div className="m-t-1">
                                <label className="block text-16-px">Mô tả</label>
                                <textarea value={ data.description } onChange = {
                                    (e) => { setData({ ...data, description: e.target.value }) }
                                } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text"/>
                            </div>
                            <div className ="submit-btn">
                                <button className="sign-btn block m-t-1 p-1-5 w-100-pct pointer" onClick={ submit }>Tiếp tục</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
