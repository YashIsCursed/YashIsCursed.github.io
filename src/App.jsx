import './App.css'
import AboutC from "./Components/CardComps/AboutC.jsx";
function App() {
    return(
        <>
            <div className={`flex justify-between items-start w-full h-full gap-8 px-8`}>
                <div className={`w-[20%] flex flex-col items-start`}>
                {/*    TODO List */}
                        <p className={'stroke-1 stroke-red-800'}>Home</p>
                        <p>Projects</p>
                </div>
                <div className={`w-full h-full border-l border-white/20 overflow-x-hidden`}>
                {/*    TODO Main AREA */}
                {/*    <h1>MAIN AREA</h1>*/}
                    <AboutC/>
                </div>
            </div>
            <div className={`w-screen leading-64 font-['Jersey_25'] text-[384px]`}>
                Yash Bokade
            </div>
            </>
    )
}
export default App
