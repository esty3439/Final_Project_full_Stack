import NavigateButton from "../../components/navigateButton"
import MyWordsListLayout from "../../routes/layouts/myWordsListLayout"

const MyWords =() =>{
    return <header>
        <NavigateButton navigation={'/user/my-words'} buttonText={'🔙'}/>
        <MyWordsListLayout/>
    </header>
}

export default MyWords