import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import $ from 'jquery';

import Close from '../close';

export default (props) => {

    const { closeBox, partner, setPartner, submit } = props;
    const [ data, setData ] = useState(partner)
    const [ height, setHeight ] = useState(0);
    const [ isUrlImage, setIsUrlImage ] = useState(false)

    const unique_string = useSelector(state => state.unique_string);

    useEffect(() => {
        const w = $("#partner-img").width()
        setHeight(w)
    }, [])


    const submitPartnerChange = () => {
        closeBox();
        if( data != partner ){

            setPartner(data)
            fetch(`/api/${unique_string}/partner/update`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ partner: {...data, image_url: ( isUrlImage ? data.image_url : "" )} }),
            }).then( res => res.json() ).then( data => {
                
            })
        }

    }

    const inputClickTrigger = (e) => {
        $(e.target).parent().find('input').click();
    }

    const changeIMG = (e) => {
        const files = e.target.files;
        if( files ){
            const file = files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (e) => {
                const img = e.target.result;
                setData({...data, image_url: img});
                setIsUrlImage(true);
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
                    <div className="w-50-pct">
                        <div className="mg-auto p-2">
                            <div>
                                <label className="block text-16-px">Đơn vị tiếp nhận giải pháp</label>
                                <input value={ data.partner_name } onChange={
                                    (e) => { setData({ ...data, partner_name: e.target.value }) }
                                } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text"/>
                            </div>
                            <div className="m-t-1">
                                <label className="block text-16-px">Địa chỉ</label>
                                <input value={ data.address } onChange={
                                    (e) => { setData({ ...data, address: e.target.value }) }
                                } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text"/>
                            </div>
                            <div className="m-t-1">
                                <label className="block text-16-px">Hotline</label>
                                <input value={ data.hotline } onChange={
                                    (e) => { setData({ ...data, hotline: e.target.value }) }
                                } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text"/>
                            </div>
                            <div className="m-t-1">
                                <label className="block text-16-px">Email</label>
                                <input value={ data.email } onChange={
                                    (e) => { setData({ ...data, email: e.target.value }) }
                                } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text"/>
                            </div>
                            <div className="m-t-1">
                                <label className="block text-16-px">Fax</label>
                                <input value={ data.fax } onChange={
                                    (e) => { setData({ ...data, fax: e.target.value }) }
                                } className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="w-50-pct flex flex-wrap p-2">

                        <span className="block w-100-pct text-16-px">Logo</span>

                        <div id="partner-img" className="w-100-pct border-1-dashed mg-auto p-1" style={{ height: `${height}px` }}>
                            <img src={ data.image_url ? data.image_url : "/assets/image/default.png" } className="w-70-pct block mg-auto" onClick={ inputClickTrigger }/>
                            <input type="file" className="hidden" onChange={ changeIMG }/>
                            <span className="block w-fit-content m-t-1 mg-auto border-1-dashed pointer p-0-5" onClick={ inputClickTrigger }>Chọn ảnh</span>
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <button onClick={ submitPartnerChange } className="bg-deep-gray border-radius-8-px block ml-auto m-r-1 p-l-1 p-r-1 p-t-0-5 p-b-0-5 no-border pointer">Xuất bản</button>
                </div>
            </div>
        </div>
    )
}
