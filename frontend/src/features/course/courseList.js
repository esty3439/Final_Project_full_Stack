import { useGetUserProgressByUserQuery } from "../userProgress/userProgressApi"
import { Card, CardContent, CardActionArea, Typography, Grid } from "@mui/material"
import { Link } from "react-router-dom"
import PageTitle from "../../components/pageTitle"
import LoadingSpinner from "../../components/loadingSpinner"
import ErrorMessage from "../../components/errorMessage"
import InfoMessage from "../../components/infoMessage"
import SideMenu from "../../components/sideMenu"

const rainbowGradients = [
  "from-pink-400 to-red-500",
  "from-purple-400 to-indigo-500",
  "from-green-400 to-lime-500",
  "from-yellow-300 to-orange-400",
  "from-teal-400 to-cyan-500",
]

const CourseList = () => {
  const { data: userProgress, isLoading, error } = useGetUserProgressByUserQuery()
  const courses = userProgress?.courses ?? []

  if (isLoading) return <LoadingSpinner text="טוען פרטי משתמש" />
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"} />
  if (courses.length === 0) return <InfoMessage message="לא נמצאו קורסים" />

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-[80px] px-6 max-md:px-3">
      <div className="max-w-6xl mx-auto text-center mb-10 max-md:mb-6">

        <SideMenu/>
        
        <PageTitle text="בחר את קורס האנגלית שלך" />
        <p className="text-gray-600 mt-2 max-md:text-sm">
          בחר קורס כדי להתחיל ללמוד מילים חדשות ולשפר את כישורי האנגלית שלך 🚀
        </p>
      </div>

      <Grid container spacing={4} justifyContent="center" className="max-md:gap-y-6">
        {courses.map((course, index) => {
          const gradient = rainbowGradients[index % rainbowGradients.length]
          return (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-0 cursor-pointer">
                <div className={`h-24 max-md:h-20 bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                  <span className="text-3xl max-md:text-2xl animate-bounce text-white">🎓</span>
                </div>

                <CardActionArea component={Link} to={`/user/course/${course._id}`}>
                  <CardContent className="flex flex-col items-center justify-center text-center py-6 px-4 bg-white">
                    <Typography
                      variant="h6"
                      component="h2"
                      className="font-bold text-gray-800 mb-2 truncate max-md:text-lg"
                    >
                      {course.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="text-gray-500 max-md:text-sm"
                    >
                      הרחב את אוצר המילים שלך עם שיעורים מהנים ומאתגרים!
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default CourseList