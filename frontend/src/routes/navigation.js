import { NavLink } from "react-router-dom"

const Navigation = () => {
    return (
    <ul>
        <li><NavLink to='/register'>register</NavLink></li>
        <li><NavLink to='/login'>login</NavLink></li>
    </ul>
    )
}

export default Navigation