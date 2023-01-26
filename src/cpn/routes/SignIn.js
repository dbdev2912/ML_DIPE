import { useState } from 'react';
import { useSelector } from 'react-redux';
export default () => {

    const unique_string = useSelector( state => state.unique_string );

    const [ auth, setAuth ] = useState({});

    const enterTriggered = (e) => {
        if( e.keyCode === 13 ){
            submit()
        }
    }
    /* Error modals */

    const submit = () => {
        if( auth.username && auth.password ){
            fetch(`/api/${ unique_string }/auth/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(auth)
            })
            .then( res => res.json() )
            .then( (data) => {
                const { success, msg, role } = data;
                if( success ){
                    if( role === "admin" ){
                        window.location ="/ml-admin"
                    }
                    if( role === "user" ){
                        window.location = "/"
                    }
                }
            })
        }else{
            /* Alert */
            console.log({ success: false, msg: "Một vài trường đang khum có dữ liệu" })
        }
    }

    return(
        <div className="fullscreen flex-no-wrap fade-in-ease">
            <div className="w-50-pct"></div>
            <div className="w-50-pct bg-light-blue"></div>
            <div className="fixed-default fullscreen flex flex-middle">
                <div className="login-container flex-no-wrap border-radius-12-px bg-white shadow" style={{ height: "80vh" }}>
                    <div className="w-50-pct bg-fit border-radius-12-px left-bg flex flex-middle shadow-right">
                        <img className="block w-25-pct" src="/assets/image/mylan.png"/>
                    </div>
                    <div className="w-50-pct flex flex-middle">
                        <div className="w-80-pct mg-auto">
                            <div className="w-100-pct">
                                <span className="block text-right text-32-px mylan-color">WELCOME</span>
                            </div>
                            <div className="w-100-pct m-t-1 flex flex-no-wrap flex-middle">
                                <div className="w-24-px">
                                    <img className="block w-100-pct" src="/assets/icon/user.png"/>
                                </div>
                                <input onKeyUp={ enterTriggered } onChange={ (e) => { setAuth( {...auth, username: e.target.value} ) } } type="text" className="block w-80-pct ml-auto border-radius-12-px border-1 p-0-5"/>
                            </div>
                            <div className="w-100-pct m-t-1 flex flex-no-wrap flex-middle">
                                <div className="w-24-px">
                                    <img className="block w-100-pct" src="/assets/icon/pwd.png"/>
                                </div>
                                <input onKeyUp={ enterTriggered } onChange={ (e) => { setAuth( {...auth, password: e.target.value} ) } } type="password" className="block w-80-pct ml-auto border-radius-12-px border-1 p-0-5"/>
                            </div>
                            <div className="w-100-pct mg-auto m-t-1 flex flex-no-wrap">
                                <div className="w-50-pct flex flex-no-wrap flex-middle">
                                    <div className="w-20-px">
                                        <span className="block w-20-px border-1 check-box"/>
                                    </div>
                                    <span className="block w-100-pct text-small mylan-color p-1">Remember me</span>
                                </div>
                                <div className="w-50-pct flex flex-no-wrap flex-end">
                                    <div>
                                        <button className="sign-btn" onClick={ submit }>Sign in</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
