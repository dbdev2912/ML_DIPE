import $ from 'jquery';
import { useEffect, useState } from 'react';

import MenuDropBox from '../../../widgets/menu-dropbox';

export default () => {
    const [ marginTop, setMT ] = useState(0);

    const menuList = [
        { id: 0, label: "TRANG CHỦ", url: "/ml-admin" },
        { id: 1, label: "CƠ SỞ DỮ LIỆU", url: "/ml-admin/db" },
        { id: 2, label: "NGƯỜI DÙNG", url: "/ml-admin/accounts" },
        { id: 3, label: "QUYỀN TRUY CẬP", url: "/ml-admin/privileges" },
        { id: 4, label: "THIẾT KẾ", url: "", items: [
            { id: 31, label: "Thành phần chung", url: "/ml-admin/design/cpn" },
            { id: 32, label: "Trang", url: "/ml-admin/design/pages" },
            { id: 33, label: "APIs", url: "" },
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
            )}

        </div>
    )
}
