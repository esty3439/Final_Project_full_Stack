import { useParams } from "react-router-dom"
import { useGetCourseCategoriesQuery } from "./courseApi"

const CategoriesSection = () => {
    const { courseId } = useParams()

    const { data: categories, isLoading, error } = useGetCourseCategoriesQuery(courseId)

    if (isLoading)
        return <p>loading categories...</p>

    if (error)
        return <p>error loading categories...</p>

    return (
        <div>
            {categories.map((category) => (
                <button >{category.name}</button>
            ))}
        </div>
    )
}

export default CategoriesSection