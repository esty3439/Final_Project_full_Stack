import { NavLink } from "react-router-dom"


const MyWordsListNavigation =() =>{
  return <div style={{display:'flex'}}>
    <NavLink to='words' style={({ isActive }) => ({backgroundColor: isActive ? 'black' : 'white',color: isActive ? 'white' : 'black',marginRight:'2px'})}>words</NavLink>
    <NavLink to='categories' style={({ isActive }) => ({backgroundColor: isActive ? 'black' : 'white',color: isActive ? 'white' : 'black',})}>categories</NavLink>
  </div>
}

export default MyWordsListNavigation