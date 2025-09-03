import { useState } from "react"
import { useDeleteFavoriteWordMutation, useGetAllFavoriteWordsQuery, useUpdateFavoriteWordRaitingMutation } from "./favoriteWordApi"
import SearchInput from "../../components/searchInput"
import SortSelect from "../../components/sortSelect"
import FavoriteWordCard from "./favoriteWordCard"
import Pagination from "../../components/pagination"
import NavigateButton from "../../components/navigateButton"

const FavoriteWordsList = () => {
    const [message, setMessage] = useState(null)
    const [searchText, setSearchText] = useState("")
    const [sortBy, setSortBy] = useState('sort by')
    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(null)

    const limit = 10
    
    const [deleteFavoriteWord, { isLoading: deleteLoading }] = useDeleteFavoriteWordMutation()
    const [updateFavoriteWordRaiting, { isLoading: updateLoading }] = useUpdateFavoriteWordRaitingMutation()
    const { data, isLoading, error } = useGetAllFavoriteWordsQuery({ page, limit, sortBy })

    const favWords = data?.words || []
    const totalPages = data?.totalPages

    const filteredFavWords = favWords.filter(favWord => favWord.word.word.indexOf(searchText.toLocaleLowerCase()) > -1)

    const sortByWord = (a, b) => a.word.word.localeCompare(b.word.word)
    const sortByRateing = (a, b) => a.rateing - b.rateing

    const sortedFavWords = [...filteredFavWords].sort(
        sortBy === "words" ? sortByWord : sortBy === "rateing" ? sortByRateing : () => 0
    )

    if (isLoading || deleteLoading || updateLoading)
        return <p>loading ...</p>

    if (error)
        return <p>{error?.data?.message || "something went wrong"}</p>

    return <div>
        {message && (<div style={{ color: message.type === 'error' ? 'red' : 'green', marginBottom: '1rem', }}>{message.text}</div>)}
        <SearchInput searchText={searchText} setSearchText={setSearchText} placeholder={'Search word...'} />
        <SortSelect sortBy={sortBy} setSortBy={setSortBy} options={['words', 'rateing']} />
        <NavigateButton navigation={'/user/my-words'} buttonText={'🔙'}/>
        {
        sortedFavWords.length===0 ? <h1>No words found !!!</h1>:
        sortedFavWords.map((favWord) => (<FavoriteWordCard favWord={favWord} showModal={showModal} setShowModal={setShowModal} deleteFavoriteWord={deleteFavoriteWord} setMessage={setMessage} updateFavoriteWordRaiting={updateFavoriteWordRaiting}/>))
        }
        <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
    </div>
}

export default FavoriteWordsList