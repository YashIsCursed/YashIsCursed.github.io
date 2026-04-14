import gsap from "gsap";
import {SplitText} from "gsap/SplitText";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
function AboutC() {
    gsap.registerPlugin(SplitText);
    const LeftsplitText= useRef();
    const EngMajRef = useRef()

    useGSAP(()=>{
    const tl = gsap.timeline({repeat: -1});
    //

        tl.from(".items", {y:"-120%",duration:0.5,delay:4})
        tl.to(".items", {y:"-120%",duration:0.5,delay:4})


    },[EngMajRef])
    // eslint-disable-next-line react-hooks/refs
        const a = new SplitText(LeftsplitText.current, {
            type:"chars",
            onSplit: (t) => {


                t.chars.forEach((char) => {
                    char.className = "-rotate-90"
                });
            }
        });

        gsap.from(a.chars, {
            duration: 1,
            x: -100,
            opacity: 0,
            stagger: 0.1,
        })
return (
    <div className='h-full w-full relative flex flex-row items-start gap-4'>
        <p className='h-fit  flex flex-col-reverse items-start'>

            <p ref={LeftsplitText} className={`w-min flex flex-col-reverse`}>About me</p>
        </p>
        <div className='pl-4 h-full w-full rounded-xl p-2 font-["Bebas_Neue"] flex flex-col gap-4'>

            <h1></h1>
            <div className='flex flex-row gap-4 w-full h-full font-["Khand"] font-thin text-xl'>
                <div className={`w-full h-full`}>
                    Hello I'm A Student
                    <p className={`inline text-2xl font-[Bebas_Neue]`}> FRESHER </p>
                    in
                    <p className={`text-3xl font-[Bebas_Neue] flex gap-2`}> Computer
                        <span ref={EngMajRef} className={`flex flex-col gap-2 w-37.5 h-11.25 overflow-clip`}>
                            <p className={`items inline w-min`}> Engineering</p>
                            <p className={`items inline w-min`}> Major</p>
                        </span>
                    </p>
                    <p>
bkhb
                    </p>

                </div>
                <div className={`w-full h-full`}>B</div>
            </div>
        </div>
    </div>
)}

export default AboutC;

