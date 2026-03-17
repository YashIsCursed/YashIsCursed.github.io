import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Loading from "./components/Loading.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {window.location.pathname === "/" && <>
            <Loading/>
            <App />
        </>}
        {window.location.pathname === "/projects" && <div>hello Path <p onClick={(e)=>{
            e.preventDefault();
            window.history.back();
        }}>Back</p></div>}

        {window.location.pathname !== "/" && <div>hello Path <p onClick={(e)=>{
            e.preventDefault();
            window.history.back();
        }}>Back</p></div>}
    </StrictMode>,
)
