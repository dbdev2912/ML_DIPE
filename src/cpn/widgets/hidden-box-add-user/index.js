import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import $ from 'jquery';

import Close from '../close';
import { id } from '../../useful';
export default (props) => {

    const { closeBox, addUser } = props;
    const [ data, setData ] = useState({});

    const unique_string = useSelector(state => state.unique_string);

    useEffect(() => {

    }, [])


    const submit = () => {
        const user = { ...data, credential_string: id() }

        fetch(`/api/${ unique_string }/account`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ user }),
        }).then( res => res.json() ).then(data => {

        })
        addUser( user );
        closeBox();
    }

    return(
        <div className="fixed-default fullscreen trans-dark z-index-9 flex flex-middle">

            <div className="w-50-pct bg-white border-radius-12-px rel" style={{ minHeight: "400px", minWidth: "768px" }}>
                <div className="abs t-0 r-0">
                    <Close triggered={closeBox}/>
                </div>
                <div className="flex">
                    <div className="p-1 w-100-pct">
                        <span className="text-24-px">NGƯỜI DÙNG MỨI</span>

                        <div className="m-t-2">
                            <label className="text-16-px">Tên đăng nhập</label>
                            <input value={ data.account_string }
                            onChange={
                                (e) => { setData({ ...data, account_string: e.target.value }) }
                            }
                            onKeyUp = {
                                (e) => { if( e.keyCode === 13 ){ submit() } }
                            }
                             className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px" type="text"/>
                        </div>
                        <div className="m-t-2">
                            <label className="text-16-px">Mật khẩu</label>
                            <input value={ data.pwd_string } type="password"
                            onChange={
                                (e) => { setData({ ...data, pwd_string: e.target.value }) }
                            }
                            onKeyUp = {
                                (e) => { if( e.keyCode === 13 ){ submit() } }
                            }
                             className="block w-100-pct p-0-5 m-t-0-5 border-1 border-radius-8-px"/>
                        </div>
                    </div>
                </div>
                <div className="p-0-5 abs b-0 r-0">
                    <button onClick={ submit } className="bg-deep-gray border-radius-8-px block ml-auto p-l-1 p-r-1 p-t-0-5 p-b-0-5 no-border pointer">Xuất bản</button>
                </div>
            </div>
        </div>
    )
}
