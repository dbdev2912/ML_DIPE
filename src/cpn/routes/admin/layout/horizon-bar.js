export default () => {
    return(
        <div className="sticky-default bg-white z-index-10 w-100-pct flex flex-no-wrap flex-aligned shadow p-0-5" id="horizon-bar">
            <div className="block">
                <img className="block w-100-px" src="/assets/image/mylan.png"/>
            </div>
            <div className="ml-auto">
                <div className="border-1 border-radius-50-pct w-50-px flex flex-middle" style={{ height: "50px" }}>
                    <img className="block w-46-px border-radius-50-pct" src="/img/user/admin.jpg"/>
                </div>
            </div>
        </div>
    )
}
