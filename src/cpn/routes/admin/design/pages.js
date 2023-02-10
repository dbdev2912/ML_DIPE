import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HorizonBar from '../layout/horizon-bar';
import VerticalBar from '../layout/vertical-bar';
import $ from 'jquery';
import { openTab } from '../../../useful';


export default () => {
    const [ vh, setVH ] = useState(70);
    const unique_string = useSelector(state => state.unique_string);
    const [ pages, setPages ] = useState([
        { page_id: 0, title: "Chang chủ nè", url: "/", description: "Khum có mô tả gì cả" },
        { page_id: 1, title: "Chang giới thiệu nè", url: "/about", description: "Khum có mô tả gì cả" },
    ])
    useEffect(()=> {
        setVH( window.innerHeight - $("#horizon-bar").height() - 52 );
        $(window).on("resize", () => {
            setVH( window.innerHeight - $("#horizon-bar").height() - 52 );
        })

        fetch(`/api/${unique_string}/page/all`).then(res => res.json()).then(data => {
            const { success, pages } = data;
            if( success ){                
                setPages(pages);
            }
        })
    }, [])

    return(
        <div>
            <HorizonBar />
            <VerticalBar />
            <div className="p-2 app-p-300">
                <div className="w-100-pct m-l-1 p-1 scroll-y shadow" style={{ height: `${vh}px` }}>
                    <div className="flex flex-no-wrap">
                        <div className="p-0-5">
                            <span className="text-16-px block">TRANG</span>
                        </div>
                        <div className="ml-auto flex flex-no-wrap">
                            <div className="p-0-5 pointer">
                                <img src="/assets/icon/search.png" className="block w-24-px"/>
                            </div>
                            <div className="p-0-5 pointer">
                                <img src="/assets/icon/add.png" className="block w-24-px" onClick={ () => { openTab("/ml-admin/design/page/add") } }/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-no-wrap border-1-bottom border-1-top">
                            <div className="w-33-pct">
                                <span className="block border-1-left p-0-5 text-16-px theme-color bold">Tiêu đề</span>
                            </div>
                            <div className="w-33-pct">
                                <span className="block border-1-left p-0-5 text-16-px theme-color bold">URL</span>
                            </div>
                            <div className="w-34-pct">
                                <span className="block p-0-5 border-1-left theme-color bold border-1-right text-16-px">Mô tả</span>
                            </div>
                        </div>

                        { pages.map( page =>
                            <div className="flex stripped flex-no-wrap border-1-bottom" key={ page.page_id } onClick={ () => { openTab(`/ml-admin/design/page/edit/${ page.page_id }`) } }>
                                <div className="w-33-pct">
                                    <span className="block border-1-left p-0-5 text-16-px">{ page.title }</span>
                                </div>
                                <div className="w-33-pct">
                                    <span className="block border-1-left p-0-5 text-16-px">{ page.url }</span>
                                </div>
                                <div className="w-34-pct">
                                    <span className="block p-0-5 border-1-left border-1-right text-16-px">{ page.description }</span>
                                </div>
                            </div>
                        ) }

                    </div>
                </div>
            </div>

        </div>
    )
}
