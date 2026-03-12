import './App.css'
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger,SplitText} from "gsap/all";
function App() {
    const NameT = useRef(null);
    gsap.registerPlugin(ScrollTrigger,SplitText);
    useGSAP(()=> {
        // On Load
        let name = SplitText.create(NameT.current,{type:"chars, words"})
        gsap.from(name.chars,{
            y: 100,
            stagger: 0.1,
            delay:3
        })

        function complett(){}
    })
  return (
    <>
        <div className="flex flex-col md:flex-row w-full justify-between items-cente">
            <div className="overflow-hidden">
                <h1 ref={NameT}>Yash Bokade</h1>
            </div>
            <div>djvyg</div>
        </div>
        <div><h2>Hello World</h2></div>
    </>  )
}

export default App
