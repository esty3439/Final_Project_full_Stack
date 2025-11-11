import { Outlet } from "react-router-dom"
import PublicNavigation from "../navigations/publicNavigation"

const PublicLayout = () => {
    return <div>
        <PublicNavigation />
        <main className="mt-[64px] p-4"><Outlet /></main>
    </div>
}

export default PublicLayout