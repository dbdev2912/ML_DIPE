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
        <div className="fullscreen flex-no-wrap fade-in-ease" >
            <div className="fullscreen fixed-default bg-fit z-index-0 -bg-blur" style={{ backgroundImage: "url(/assets/image/bg3.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}/>
            {/* <div className="fullscreen fixed-default bg-mylan lr z-index-0" />*/}

            <div className="fixed-default fullscreen flex flex-middle z-index-1" >
                <div className="login-container flex-no-wrap --bg-op-0-5 -bg-white" style={{ height: "80vh" }}>

                    <div className="w-100-pct mg-auto bg-white p-2 p-b-3 border-radius-12-px" >
                        <div className="w-80-pct mg-auto" style={{marginTop: "1em"}}>
                            <div className="w-100-pct">
                                <div className="flex flex-center flex-wrap">
                                    <img className="block w-33-pct" src="/assets/image/mylan.png"/>
                                </div>
                            </div>
                            <span className="block text-center m-t-1 text-24-px mylan-color">{ "hệ sinh thái nền tảng công nghiệp số".toUpperCase() }</span>
                            <div className="w-100-pct m-t-1 flex flex-wrap flex-middle">
                                {/* <div className="w-24-px">
                                    <img className="block w-100-pct" src="/assets/icon/user.png"/>
                                </div>*/}
                                <span className="block w-100-pct text-16-px p-b-0-5">Tên đăng nhập</span>
                                <input onKeyUp={ enterTriggered } onChange={ (e) => { setAuth( {...auth, username: e.target.value} ) } } type="text" className="block w-100-pct ml-auto border-radius-12-px border-1 p-0-5"/>
                            </div>
                            <div className="w-100-pct m-t-1 flex flex-wrap flex-middle">
                                {/* <div className="w-24-px">
                                    <img className="block w-100-pct" src="/assets/icon/pwd.png"/>
                                </div> */}
                                <span className="block w-100-pct text-16-px p-b-0-5">Mật khẩu</span>
                                <input onKeyUp={ enterTriggered } onChange={ (e) => { setAuth( {...auth, password: e.target.value} ) } } type="password" className="block w-100-pct ml-auto border-radius-12-px border-1 p-0-5"/>
                            </div>
                            <div className="w-100-pct mg-auto m-t-1 flex flex-no-wrap">
                                <div className="w-50-pct flex flex-no-wrap flex-middle">
                                    <div className="w-20-px">
                                        <span className="block w-14-px border-1 check-box"/>
                                    </div>
                                    <span className="block w-100-pct text-small p-1">Nhớ đăng nhập</span>
                                </div>
                                <div className="w-50-pct flex flex-no-wrap flex-end">
                                    <div>
                                        <button className="sign-btn pointer" onClick={ submit }>Đăng nhập</button>
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
