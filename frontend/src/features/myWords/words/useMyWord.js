import {useUpdateMyWordRaitingMutation, useDeleteMyWordMutation } from './myWordApi'
import { useState } from "react"

const useMyWord = () => {
    const [updateMyWordRaiting] = useUpdateMyWordRaitingMutation()
    const [deleteMyWord] = useDeleteMyWordMutation()
    const [message, setMessage] = useState (null)

    //hook to update word rating
    const handleUpdateMyWordRaiting = async (myWordData) => {
        setMessage(null)
        try {
            await updateMyWordRaiting(myWordData).unwrap()
            setMessage({ type: "success", text: "Word rating updated successfully!" })
            setTimeout(()=>setMessage(null),2000)
        } catch (err) {
            const errorMsg = err?.data?.message || err?.error || "Unknown error"
            setMessage({ type: "error", text: errorMsg })
            setTimeout(()=>setMessage(null),2000)
        }
    }

    // hook to delete word
    const handleDeleteMyWord = async (myWordData) => {
        setMessage(null)
        try {
            await deleteMyWord(myWordData).unwrap()
            setMessage({ type: "success", text: "Word deleted successfully!" })
            setTimeout(()=>setMessage(null),2000)
        } catch (err) {
            const errorMsg = err?.data?.message || err?.error || "Unknown error"
            setMessage({ type: "error", text: errorMsg })
            setTimeout(()=>setMessage(null),2000)
        }
    }

    return { handleUpdateMyWordRaiting, handleDeleteMyWord, message }
}

export default useMyWord