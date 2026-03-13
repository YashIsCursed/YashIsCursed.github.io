import './App.css'
import {useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger,SplitText,Observer} from "gsap/all";
function App() {
    const NameT = useRef(null);
    const linkList = useRef(null);
    const [menu,setMenu] = useState(false);
    gsap.registerPlugin(ScrollTrigger,SplitText,Observer);

    useGSAP(()=> {
        // On Load
        let name = SplitText.create(NameT.current,{type:"chars, words"})
        gsap.from(name.chars,{
            y: 100,
            stagger: 0.1,
            delay:3
        })
        Observer.create({
            target: linkList.current,
            onHover:() => {
                gsap.to('.links',{
                    y:0,
                    stagger: 0.125,
                    duration:0.5
                })
            }
        })

        gsap.from('.links',{

            y:"-101%",
            stagger: 0.125,
            delay:3
        })
    })

  return (
    <>
        <div className="flex sm:flex-col flex-row w-full justify-between items-center">
            <div className="overflow-hidden">
                <h1 ref={NameT}>Yash Bokade</h1>
            </div>
            <div className="relative">
                <button
                    className="lg:hidden text-[32px]"
                    onClick={()=>{setMenu(!menu)}}>⇶</button>
                <ul
                    ref={linkList}
                    className={`h-fit ${menu?'flex bg-[#A3A3D310] py-4 px-8 rounded-xl absolute right-full top-[120%]':'hidden'} lg:flex flex-col lg:flex-row gap-6 overflow-y-hidden px-2 text-xl`}>
                    <li className="links">About</li>
                    <li className="links">Projects</li>
                    <li className="links">Contact</li>
                    <li className="links">Resume/CV</li>
                </ul>
            </div>
        </div>
        <div><h2>Hello World</h2></div>
    </>  )
}

export default App
