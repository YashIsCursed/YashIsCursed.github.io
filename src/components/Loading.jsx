import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

export default function Loading() {
    const loadingC = useRef(null);
    const textC = useRef(null);
    const box= useRef(null);

    useGSAP(()=> {
        gsap.timeline()
            .from(textC.current, {opacity: 0,duration: 0.25})
            .call(() => {
                let count = 0;
                let a = setInterval(() => {
                    textC.current.innerText += "."
                    count >= 10 ? clearTimeout(a) : count += 1
                }, 200)
            })
            .to(textC.current, {opacity: 0, duration: 1, delay: 1})
            .from(box.current, {width: "100%", duration: 0.5})
            // .to(box.current, {width: "0%", duration: 1})
            .to(loadingC.current, {width:0, duration: 1,onComplete: () => {loadingC.current.remove()}})

    })
    return(
        <>
            <div
                ref={loadingC}
                className="text-[#E0F0E0] loading z-30 top-0 left-0 fixed h-screen w-screen flex justify-center items-center backdrop-blur-sm">
                <div
                    ref={box}
                    className="h-screen bg-[#A0DDA0] fixed"/>
                <h2
                    ref={textC}
                    className={`fixed text-8xl font-serif`}>Loading...</h2>
            </div>
        </>
    )
}