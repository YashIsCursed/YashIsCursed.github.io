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
            y: "100%",
            opacity: 0,
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
              <div className="flex flex-row w-full justify-between">
                  <div className="overflow-hidden tracking-[-16px] text-left text-4xl">
                      <h1 ref={NameT}>Yash Bokade</h1>
                  </div>
                  <div className="flex flex-col gap-8 items-center">
                    {/*  Nav  */}
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
                    {/*  About  */}
                      <div>
                          <img
                              alt="Minimalist architectural space with play of light"
                              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf3rkFxRWaRwlYERzuG7U4qw0PrH8Ec2ORafqDuyLBJ_UzdF3JM-DUqPFOhYreplH7MjRvgtMhTa2iWXrHio4yk_IHCUxD-nJLzZuiEN6hGGfmOwxC5s7bVEyShBvngMmVNXFSwg6LDGxcuAhZ0V1igafJHOPg4scNChY36qNjc7K5Wijwsp4nbu6g9iuL1PkF83-wldGI9oo_i893cbXD-pppaiYJvDUDop8UGI8q5d1_6noMooFxZBQ1Xre92O1-Sq6QEyPgAmI"/>
                      </div>
                  </div>
              </div>
              {/*  footer  */}
              <div className="w-full h-fit flex justify-center items-center bg-black">
                  <div id={"About"} className="w-full h-screen">
                      About
                  </div>
              </div>
          </div>
      </>)
}

export default App
