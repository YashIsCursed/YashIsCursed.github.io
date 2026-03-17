import './App.css'
import {useRef, useState} from "react";

import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger,SplitText,Observer} from "gsap/all";

import {Menu} from "lucide-react";
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
            stagger: 0.25,
            delay:3
        })
    })

  return (
      <>
          <div className="w-full h-screen my-8 flex flex-col gap-12">
              <div className="flex flex-row w-full justify-between items-center">
                    <div className="overflow-hidden text-2xl">
                        <h1 ref={NameT}>Yash Bokade</h1>
                    </div>
                    <div className="relative">
                        <div
                            className="lg:hidden text-[32px]"
                            onClick={()=>{
                                gsap.from(".links",{
                                    y:"-200%",
                                    stagger: 0.125,
                                    duration:0.5,
                                })
                                setMenu(!menu)
                            }}>
                            <Menu />
                        </div>
                        <ul
                            ref={linkList}
                            className={`h-fit ${menu?'flex bg-[#1f1f1f55] backdrop-blur-2xl  py-4 px-8 rounded-xl absolute right-full top-[120%]':'hidden'} lg:flex flex-col lg:flex-row gap-6 overflow-y-hidden px-2 text-xl`}>
                            <li
                                onClick={(e)=>{
                                    window.location.href = "/projects";
                                    }}
                                className="links"><p href="/projects">About</p></li>
                            <li
                                onClick={(e)=>{
                                    window.location.href = "/projects";
                                    }}
                                className="links"><p>Projects</p></li>
                            <li
                                onClick={(e)=>{
                                    window.location.href = "/projects";
                                    }}
                                className="links"><p>Contact</p></li>
                            <li
                                onClick={(e)=>{
                                    window.location.href = "/projects";
                                    }}
                                className="links"><p>Resume</p></li>
                        </ul>
                    </div>
              </div>
              <div>
                  <p className="text-[16px]">About</p>
                  <div id={"About"} className="w-full h-screen">
                      About
                  </div>
              </div>
          </div>
      </>)
}

export default App
