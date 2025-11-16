import { useState } from "react"
import { useGetAllMyWordsQuery } from "./myWordApi"
import MyWordCard from "./myWordCard"
import AddWordForm from "./addWordForm"
import SearchInput from "../../../components/searchInput"
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"

const MyWordList = () => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [searchText , setSearchText] =useState('')

    const { data: words=[], isLoading, error } = useGetAllMyWordsQuery()
    const filteredWords = words.filter(word => word.word.word.indexOf(searchText.toLowerCase()) > -1)

    if (isLoading) return <LoadingSpinner/>
    if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>

    return <div>
        <button onClick={()=>setShowAddForm(true)}>➕</button>
        <SearchInput searchText={searchText} setSearchText={setSearchText} placeholder={'🔎Search word...'}/>
        
        {
            filteredWords.length===0 ? <h1>no words found!!!</h1>:
            filteredWords.map((word) => <MyWordCard myWord={word} />)
        }
        {showAddForm && <AddWordForm setShowAddForm={setShowAddForm} />}
    </div>
}

export default MyWordList