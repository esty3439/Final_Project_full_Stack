import ErrorMessage from "../../../components/errorMessage"
import LoadingSpinner from "../../../components/loadingSpinner"
import { useGetAllMyCategorisQuery } from "../categories/myCategoryApi"

const WordFormSelectCategory = ({ label, registerProps, error, placeholder, currentCategory }) => {
    const { data: categories, isLoading, error: categoryError } = useGetAllMyCategorisQuery()

    if (currentCategory) {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label>{label}</label>
                <select {...registerProps} defaultValue={currentCategory} readOnly>
                    <option value={currentCategory}>{currentCategory}</option>
                </select>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        )
    }

    if (isLoading)return <LoadingSpinner/>
    if (categoryError) return <ErrorMessage message={categoryError?.data?.message || "משהו השתבש"}/>

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label>{label}</label>
            <select {...registerProps} defaultValue="">
                <option value="" disabled>{placeholder}</option>
                {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}

export default WordFormSelectCategory