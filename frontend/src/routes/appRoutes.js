import { Routes, Route } from "react-router-dom";
import RegisterForm from "../features/auth/registerForm";
import LoginForm from "../features/auth/loginForm";
import Layout from "./layout";
import UserDashboard from "../pages/userDashboard";
import CourseList from "../features/course/courseList";
import CourseDashboard from "../pages/courseDashboard";
import CourseWordsSection from "../features/course/wordsSection";
import CategoryWordSection from '../features/category/wordsSection'
import CategoriesSection from "../features/course/categoriesSection";
import FinalTestSection from "../features/course/finalTestSection";
import CategoryDashboard from "../pages/categoryDashboard";
import ChallengeSection from "../features/category/challengeSection";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/courseList' element={<CourseList />} />
        <Route path='/userDashboard' element={<UserDashboard />} />

        <Route path='/courseDashboard/:courseId' element={<CourseDashboard />}>
          <Route index element={<CategoriesSection />} />
          <Route path='words' element={<CourseWordsSection/>} />
          <Route path='finalTest' element={<FinalTestSection />} />
        </Route>

        <Route path='/category-dashboard/:categoryId' element={<CategoryDashboard />}>
            <Route index element={<h1>about the category</h1>}/>
            <Route path='words/:categoryName' element={<CategoryWordSection/>}/>
            <Route path='challenge' element={<ChallengeSection/>}/>
        </Route>

      </Route>
    </Routes>)
}

export default AppRoutes