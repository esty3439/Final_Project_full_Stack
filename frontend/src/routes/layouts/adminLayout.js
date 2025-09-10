import { Outlet } from "react-router-dom";
import AdminNavigation from "../navigations/adminNavigation";

const AdminLayout = () => {
  return (
    <div>
      <nav><AdminNavigation/></nav>
      <main><Outlet /></main>
    </div>
  )
}

export default AdminLayout