import {Path} from "./Path.mjs";

export default function Nav() {
    return(
        <>
            <h1>{(new Path).Path()==="/abc"? "hello":"Wrong"}</h1>
        </>
    )
}
