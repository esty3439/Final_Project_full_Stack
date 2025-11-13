import { useState } from "react"
import CategoryWordDetailes from "./categoryWordDetailes"
import { useGetWordsOfCategoryQuery } from "./myCategoryApi"
import AddWordForm from "../words/addWordForm"
import SearchInput from "../../../components/searchInput"
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"

const SingleCategoryWords = ({ showSingleCategory: category, setShowSingleCategory }) => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [searchText , setSearchText] =useState('')
    const { data: words=[], isLoading, error } = useGetWordsOfCategoryQuery(category._id)
    const filteredWords = words.filter(word => word.word.word.indexOf(searchText.toLowerCase()) > -1)

    if (isLoading) return <LoadingSpinner/>
    if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>

    return <div>
        <div style={{display:'flex'}}>
            <button onClick={() => setShowSingleCategory(null)}>❎</button>
            <button onClick={() => setShowAddForm(true)}>➕</button>
            <SearchInput searchText={searchText} setSearchText={setSearchText} placeholder={'🔎Search word...'}/>
        </div>

        {
            filteredWords.length===0?<h1>no words found in category</h1>:
            filteredWords.map((word) => (
                <CategoryWordDetailes word={word} />
            ))
        }

        {showAddForm && <AddWordForm setShowAddForm={setShowAddForm} currentCategory={category.name} />}
    </div>
}

export default SingleCategoryWords