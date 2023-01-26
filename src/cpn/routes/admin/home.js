import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import HorizonBar from './layout/horizon-bar';
import VerticalBar from './layout/vertical-bar';
import HiddenBox from '../../widgets/hidden-box-edit-partner';

export default () => {

    const [ hiddenBox, setHiddenBox ] = useState(false);
    const unique_string = useSelector( state => state.unique_string );

    const [ partner, setPartner ] = useState({})

    useEffect(()=> {
        fetch(`/api/${unique_string}/partner`).then(res => res.json())
        .then( ({ partner }) => {
            setPartner(partner)
        })
    }, [])

    const submitPartnerChange = () => {
        /* this method is abandoned and will be removed soon */
    }

    return(
        <div>
            <HorizonBar />
            <VerticalBar />
            <div className="app-p-300 rel z-index-1">
                <div className="flex flex-no-wrap w-96-pct mg-auto shadow m-t-1 border-radius-8-px">
                    <div className="w-25-pct flex flex-wrap flex-middle">
                        <span className="block w-100-pct text-center p-0-5 text-36-px">10</span>
                        <span className="block w-100-pct text-center p-b-1 text-20-px">Bảng</span>
                    </div>
                    <div className="w-25-pct flex flex-wrap flex-middle">
                        <span className="block w-100-pct text-center p-0-5 text-36-px">8</span>
                        <span className="block w-100-pct text-center p-b-1 text-20-px">Trang</span>
                    </div>
                    <div className="w-25-pct flex flex-wrap flex-middle">
                        <span className="block w-100-pct text-center p-0-5 text-36-px">16</span>
                        <span className="block w-100-pct text-center p-b-1 text-20-px">APIs</span>
                    </div>
                    <div className="w-25-pct flex flex-wrap flex-middle">
                        <span className="block w-100-pct text-center p-0-5 text-36-px">2</span>
                        <span className="block w-100-pct text-center p-b-1 text-20-px">Người dùng</span>
                    </div>
                </div>

                <div className="m-t-1 w-96-pct mg-auto">

                    <div className="flex flex-no-wrap flex-aligned">
                        <span className="block text-28-px">Đơn vị tiếp nhận giải pháp</span>
                        <div className="flex flex-middle pointer m-l-1"
                            onClick = { () => { setHiddenBox( !hiddenBox ) } }
                        >
                            <img src="/assets/icon/edit.png" className="block w-24-px"/>
                        </div>
                    </div>

                    <div className="flex flex-no-wrap flex-aligned m-t-1">
                        <span className="block text-16-px bold upper">{ partner.partner_name }</span>
                    </div>

                    <div className="flex flex-no-wrap flex-aligned m-t-1">
                        <span className="block text-16-px">{ partner.address }</span>
                    </div>

                    <div className="flex flex-no-wrap flex-aligned m-t-1">
                        <img src={ partner.image_url ? partner.image_url : "/assets/image/default.png" } style={{ width: "200px" }}/>
                    </div>

                    <div className="flex flex-no-wrap flex-aligned m-t-1">
                        <span className="block text-16-px">Email: { partner.email }</span>
                    </div>

                    <div className="flex flex-no-wrap flex-aligned">
                        <span className="block text-16-px">Hotline: { partner.hotline }</span>
                    </div>
                    <div className="flex flex-no-wrap flex-aligned">
                        <span className="block text-16-px">Fax: { partner.fax }</span>
                    </div>
                </div>

            </div>

            { hiddenBox ? <HiddenBox closeBox = { () => { setHiddenBox( !hiddenBox ) } }
                partner= { partner }
                setPartner = { setPartner }
                submit = { submitPartnerChange }
            /> : null }

        </div>
    )
}
