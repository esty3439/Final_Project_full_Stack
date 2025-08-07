import { Outlet } from "react-router-dom"
import PublicNavigation from "../navigations/publicNavigation"

const PublicLayout = () => {
    return <div>
        <nav><PublicNavigation /></nav>
        <main><Outlet /></main>
    </div>
}

export default PublicLayout