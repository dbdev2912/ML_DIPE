import $ from 'jquery';
import { useEffect, useState } from 'react';

import MenuDropBox from '../../../widgets/menu-dropbox';

export default () => {

    const [ marginTop, setMT ] = useState(0);

    const menuList = [
        { id: 0, label: "TRANG CHỦ", url: "/ml-admin" },
        { id: 1, label: "CƠ SỞ DỮ LIỆU", url: "/ml-admin/db" },
        { id: 2, label: "NGƯỜI DÙNG", url: "/ml-admin/accounts" },
        { id: 3, label: "THIẾT KẾ", url: "/ml-admin/design", items: [
            { id: 31, label: "Thành phần chung", url: "/ml-admin/cpns" },
            { id: 32, label: "Trang", url: "/ml-admin/pages" },
            { id: 33, label: "APIs", url: "/ml-admin/apis" },
        ]},
    ]

    useEffect( () => {
        const height = $("#horizon-bar").height();
        setMT(height);
    }, [])

    return(
        <div className="bg-deep-gray fixed-default z-index-2 vertical-bar-shadow" style={{ width: "300px", height: "100vh", paddingTop: `${marginTop + 25}px` }}>
            { menuList.map( list =>
                <MenuDropBox key={ list.id } box={ list }/>
            ) }

        </div>
    )
}
