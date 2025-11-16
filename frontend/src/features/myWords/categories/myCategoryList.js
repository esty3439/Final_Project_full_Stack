import { useState } from "react"
import SearchInput from "../../../components/searchInput"
import { useGetAllMyCategorisQuery } from "./myCategoryApi"
import AddCategoryForm from "./addCategoryForm"
import CategoryCard from "./categoryCard"
import SingleCategoryWords from "./singleCategoryWords"
import ErrorMessage from "../../../components/errorMessage"
import LoadingSpinner from "../../../components/loadingSpinner"

const MyCategoryList = () => {
    const [searchText, setSearchText] = useState("")
    const [showAddForm, setShowAddForm] = useState(false)
    const [showSingleCategory, setShowSingleCategory] = useState(null)

    const { data: categories = [], isLoading, error } = useGetAllMyCategorisQuery()

    const filteredCategories = categories.filter(category => category.name.indexOf(searchText.toLowerCase()) > -1)

    if (isLoading) return <LoadingSpinner/>
    if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>

    return (
        <div>
            {!showSingleCategory &&
                <div>
                    <header>
                        <SearchInput searchText={searchText} setSearchText={setSearchText} placeholder={'Search category...'} />
                        <button onClick={() => setShowAddForm(true)}>➕</button>
                    </header>

                    {
                    filteredCategories.length===0 ? <h1>No categories found!!</h1>:
                    filteredCategories.map((category) => (<CategoryCard category={category} setShowSingleCategory={setShowSingleCategory} />))
                    }
                </div>
            }
            
            {showSingleCategory && <SingleCategoryWords showSingleCategory={showSingleCategory} setShowSingleCategory={setShowSingleCategory} />}
            {showAddForm && <AddCategoryForm setShowAddForm={setShowAddForm} />}
        </div>
    )
}

export default MyCategoryList