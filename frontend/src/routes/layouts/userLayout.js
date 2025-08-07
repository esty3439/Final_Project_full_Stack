import { Outlet } from 'react-router-dom'
import UserNavigation from '../navigations/userNavigation'

const UserLayout = () => {
    return (
        <div>
            <nav><UserNavigation /></nav>
            <main><Outlet/></main>
        </div>
    )
}
export default UserLayout