import { useState } from "react"
import { useDeleteMyCategoryMutation } from "./myCategoryApi"
import UpdateCategoryForm from "./updateCategoryForm"

const CategoryCard = ({ category,setShowSingleCategory}) => {
    const [message, setMessage] = useState(null)
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const [deleteMyCategory, { isLoading: loadingDelete }] = useDeleteMyCategoryMutation()

    const handleDelete = async () => {
        setMessage(null)
        try {
            const res = await deleteMyCategory({ id: category._id }).unwrap()
            setMessage({ type: 'success', text: res?.message || 'deleted successfully' })
            setTimeout(()=>setMessage(null),2000)
        }
        catch (err) {
            const errorMsg =
                err?.data?.message ||
                err?.error ||
                'unknown error'
            setMessage({ type: 'error', text: errorMsg })
            setTimeout(()=>setMessage(null),2000)
        }
    }

    return (
        <div>
            <div style={{ backgroundColor: 'green', height: "10vh", width: '60vw', marginBottom: '1vh', marginLeft: '20vw' }}>
                <button onClick={()=>setShowSingleCategory(category)}>{category.name}</button>
                <button onClick={() => handleDelete()} disabled={loadingDelete}>{loadingDelete ? 'deleting...' : '🗑️'}</button>
                <button onClick={() => setShowUpdateForm(true)}>✏️</button>
            </div>

            { showUpdateForm && <UpdateCategoryForm setShowUpdateForm={setShowUpdateForm} category={category}/>}
            {message && (<div style={{ color: message.type === 'error' ? 'red' : 'green', marginBottom: '1rem', }}>{message.text}</div>)}
        </div>
    )
}

export default CategoryCard