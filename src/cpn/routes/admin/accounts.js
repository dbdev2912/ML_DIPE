import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HorizonBar from './layout/horizon-bar';
import VerticalBar from './layout/vertical-bar';
import $ from 'jquery';


import HiddenAddUSerBox from '../../widgets/hidden-box-add-user';

export default () => {
    const [ vh, setVH ] = useState(70);
    const unique_string = useSelector(state => state.unique_string);
    const [ users, setUsers ] = useState([]);
    const [ addUserBox, setAddUserBox ] = useState(false);
    useEffect(()=> {
        setVH( window.innerHeight - $("#horizon-bar").height() - 52 );
        $(window).on("resize", () => {
            setVH( window.innerHeight - $("#horizon-bar").height() - 52 );
        })

        fetch(`/api/${ unique_string }/account/all`).then( res => res.json() )
        .then( ({success, content, data}) => {
            setUsers( data )
        })

    }, [])

    const addUser = (newUser) => {
        setUsers([...users, newUser])
    }

    return(
        <div>
            <HorizonBar />
            <VerticalBar />
            <div className="p-2 app-p-300">
                <div className="w-100-pct m-l-1 p-1 scroll-y shadow" style={{ height: `${vh}px` }}>
                    <div className="flex flex-no-wrap">
                        <div className="p-0-5">
                            <span className="text-16-px block">NGƯỜI DÙNG</span>
                        </div>
                        <div className="ml-auto flex flex-no-wrap">
                            <div className="p-0-5 pointer">
                                <img src="/assets/icon/search.png" className="block w-24-px"/>
                            </div>
                            <div className="p-0-5 pointer">
                                <img src="/assets/icon/add.png" className="block w-24-px" onClick={ () => { setAddUserBox(!addUserBox) } }/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-no-wrap border-1-bottom border-1-top">
                            <div className="w-33-pct">
                                <span className="block border-1-left p-0-5 text-16-px theme-color bold">Tên đăng nhập</span>
                            </div>
                            <div className="w-33-pct">
                                <span className="block border-1-left p-0-5 text-16-px theme-color bold">Họ tên</span>
                            </div>
                            <div className="w-34-pct">
                                <span className="block p-0-5 border-1-left theme-color bold border-1-right text-16-px">Quyền truy cập</span>
                            </div>
                        </div>

                        { users.map( user =>
                            <div className="flex stripped flex-no-wrap border-1-bottom" key={ user.account_string }>
                                <div className="w-33-pct">
                                    <span className="block border-1-left p-0-5 text-16-px">{ user.account_string }</span>
                                </div>
                                <div className="w-33-pct">
                                    <span className="block border-1-left p-0-5 text-16-px">Nguyễn Văn A</span>
                                </div>
                                <div className="w-34-pct">
                                    <span className="block p-0-5 border-1-left border-1-right text-16-px">Chưa có quyền gì hết trơn</span>
                                </div>
                            </div>
                        ) }

                    </div>
                </div>
            </div>

            { addUserBox ? <HiddenAddUSerBox closeBox={ ()=> { setAddUserBox(!addUserBox) } } addUser={ addUser }/> : null }

        </div>
    )
}
