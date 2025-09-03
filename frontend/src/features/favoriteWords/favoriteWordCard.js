import FavoriteWordDetailesModal from "./favoriteWordDetailesModal"
import { FaStar } from "react-icons/fa";
import speak from "../../utils/speech"

const FavoriteWordCard = ({ favWord, showModal, setShowModal, deleteFavoriteWord,setMessage,updateFavoriteWordRaiting}) => {

    const handleSpeak = (word) => {
        speak(word)
    }

    const handleDelete = async (id) => {
        setMessage(null)
        try {
            const res = await deleteFavoriteWord({ id }).unwrap()
            setMessage({ type: 'success', text: res?.message || 'deleted successfully' })
        }
        catch (err) {
            const errorMsg =
                err?.data?.message ||
                err?.error ||
                'unknown error'
            setMessage({ type: 'error', text: errorMsg })
        }
    }

    const handleUpdateRateing = async (id, rateing) => {
        setMessage(null)
        try {
            const res = await updateFavoriteWordRaiting({ id, rateing }).unwrap()
            setMessage({ type: 'success', text: res?.message || 'updated successfully' })
        }
        catch (err) {
            const errorMsg =
                err?.data?.message ||
                err?.error ||
                'unknown error'
            setMessage({ type: 'error', text: errorMsg })
        }
    }

    return (
        <div>
            <div key={favWord._id} style={{ backgroundColor: 'green', height: "10vh", width: '60vw', marginBottom: '1vh', marginLeft: '20vw' }}>
                <button style={{ backgroundColor: 'gray', textDecoration: 'underLine' }} onClick={() => setShowModal(favWord)}>{favWord.word.word}</button>
                <div style={{ display: 'flex' }}>
                    <button style={{ backgroundColor: 'blue' }} onClick={() => handleSpeak(favWord.word.word)}>🔊</button>
                    <button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(favWord._id)}>🗑️</button>
                    <div style={{ display: "flex", backgroundColor: 'white' }}>
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                color={i < favWord.rateing ? "gold" : "lightgray"}
                                onClick={() => { handleUpdateRateing(favWord._id, i < favWord.rateing ? i : i + 1) }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {showModal && <FavoriteWordDetailesModal favWord={showModal} setShowModal={setShowModal} />}
        </div>
    )
}

export default FavoriteWordCard