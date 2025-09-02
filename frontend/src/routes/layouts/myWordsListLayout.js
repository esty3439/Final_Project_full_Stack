import { Outlet } from "react-router-dom"
import MyWordsListNavigation from "../navigations/myWordsListNavigation"

const MyWordsListLayout=()=>{
  return <div>
    <MyWordsListNavigation/>
    <Outlet/>
  </div>
}


export default MyWordsListLayout