import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Nav from "./components/Nav.jsx";
import Router from "./Router.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Nav/>
        <Router/>
    </StrictMode>,
)
