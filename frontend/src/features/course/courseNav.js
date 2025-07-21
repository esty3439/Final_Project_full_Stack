import { NavLink } from "react-router-dom"

const CourseNav = () => {
    return (
        <nav>
            <NavLink to=''>categories</NavLink><br/>
            <NavLink to='words'>words</NavLink><br/>
            <NavLink to='finalTest'>final test</NavLink><br/>
        </nav>
    )
}

export default CourseNav