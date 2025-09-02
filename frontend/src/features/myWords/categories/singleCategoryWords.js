import { useState } from "react"
import CategoryWordDetailes from "./categoryWordDetailes"
import { useGetWordsOfCategoryQuery } from "./myCategoryApi"
import AddWordForm from "../words/addWordForm"

const SingleCategoryWords = ({ showSingleCategory, setShowSingleCategory }) => {
    const [showAddForm, setShowAddForm] = useState(false)
    const { data: words, isLoading, error } = useGetWordsOfCategoryQuery(showSingleCategory)

    if (isLoading)
        return <p>Loading category's words...</p>

    if (error)
        return <p>{error?.data?.message || "something went wrong"}</p>

    return <div>
        <button onClick={() => setShowSingleCategory(null)}>❎</button>
        {
            words.map((word)=>(
            <CategoryWordDetailes word={word}/>
        )) 
        }
        <button onClick={()=>setShowAddForm(true)}>➕</button>

        {showAddForm && <AddWordForm setShowAddForm={setShowAddForm} />}
    </div>
}

export default SingleCategoryWords