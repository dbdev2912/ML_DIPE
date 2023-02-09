import HorizonBar from './layout/horizon-bar';
import VerticalBar from './layout/vertical-bar';
export default () => {
    return(
        <div>
            <HorizonBar />
            <VerticalBar />
            <div className="app-p-300">
                <div style={{ height: "200vh" }}>
                    <h1>Privileges</h1>
                </div>
            </div>
        </div>
    )
}
