import { NavLink } from "react-router-dom"

const CourseNavigation = () => {
    return (
        <nav>
            <NavLink to='category'>categories</NavLink><br/>
            <NavLink to='words'>words</NavLink><br/>
            <NavLink to='final-test'>final test</NavLink><br/>
        </nav>
    )
}

export default CourseNavigation