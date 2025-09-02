import BackButton from "../../components/backButton"
import MyWordsListLayout from "../../routes/layouts/myWordsListLayout"

const MyWords =() =>{
    return <header>
        <BackButton navigation={'/user/my-words'}/>
        <MyWordsListLayout/>
    </header>
}

export default MyWords