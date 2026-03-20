import App from "./App.jsx";
import Loading from "./components/Loading.jsx";

const routes = {
    "Home":<App/>,
    "projects": <Loading/>
}
export default function Router() {
    return(
        <>
            {routes.map((route, key) => {
                console.log(key)
                // if(key === window.location.pathname) return <routes./Home />
            })}
            {window.location.pathname === "/" && <App />}
        </>
    )
}