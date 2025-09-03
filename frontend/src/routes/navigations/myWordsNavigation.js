import { NavLink } from "react-router-dom"

const MyWordNavigation =()=>{
   return <div>
    <NavLink to='favorites'> favorite words</NavLink><br/>
    <NavLink to='list'>my words</NavLink><br/>
   </div>
}

export default MyWordNavigation