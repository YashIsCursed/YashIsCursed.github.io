import { useEffect, useState, useRef } from 'react';
import './App.css'
import About from "./Components/CardComps/About.jsx";
import Home from './Components/CardComps/Home.jsx';
import Projects from './Components/CardComps/Projects.jsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const navlist = ["Home", "Projects", "Skills", "Contact", "GitHub", "Linked in"]
function App() {
    const [selectedItem, setSelectedItem] = useState("Home")
    const [scroll, setScroll] = useState(0)
    const mainContRef = useRef(null)
    useGSAP(() => {
        gsap.timeline().from(mainContRef.current, {
            height: 0,
            duration: 1,
            delay: 0.5,
            ease: "sine"
        }).to(mainContRef.current, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
        })
    }, [])

    return (
        <>
            <div
                ref={mainContRef}

                className={`flex justify-between items-start w-full h-full overflow-hidden gap-4 px-32 bg-black`}
            >
                <div className={`w-[20%] flex flex-col items-start`}>
                    {/*    TODO List */}

                    {navlist.map((item) => {
                        return (
                            <p
                                onClick={() => {
                                    setSelectedItem(item)
                                    return;
                                }}
                                className={`font-['Jersey_25'] cursor-pointer text-2xl hover:text-[#c8ffc8] hover:underline ${item === selectedItem ? "" : "text-[#242424]"}`}>{item}</p>
                        )
                    })}
                </div>
                <div
                    className={`w-full h-full border-l-3 border-white/20 overflow-hidden flex flex-row-reverse`}>
                    {selectedItem === "Home" && <Home />}
                    {selectedItem === "Projects" && <Projects />}
                </div>
            </div>
            <div className={`w-screen leading-64 font-['Jersey_25'] text-[384px] bg-clip-text text-transparent  bg-linear-180 from-[#c8ffc8] to-[#0000] text-shadow-[#c8ffc8] text-shadow-lg/10`}>
                Yash Bokade
            </div>
        </>
    )
}
export default App
