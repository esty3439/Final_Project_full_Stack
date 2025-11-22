import { Outlet } from "react-router-dom"
import MyWordsListNavigation from "../navigations/myWordsListNavigation"

const MyWordsListLayout=()=>{
  return <div>
    <MyWordsListNavigation/>
    <main><Outlet /></main>
  </div>
}


export default MyWordsListLayout