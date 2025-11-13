import { useNavigate, useParams } from "react-router-dom"
import { useGetCategoryChallengeQuery } from "../categoryApi"
import QuestionCard from "./questionCard"
import { useEffect, useState } from "react"
import { useGetUserProgressByUserQuery, useUpdateChallengeResultInUserProgressMutation, } from "../../userProgress/userProgressApi"
import EndModal from "./results/endModal"
import { Button, Typography, Paper, Box } from "@mui/material"
import { toast } from "react-toastify"
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"

const ChallengeSection = () => {
  const navigate = useNavigate()
  const { categoryId, courseId } = useParams()
  const { data: challnge, isLoading, error } = useGetCategoryChallengeQuery(categoryId)
  const [updateChallengeResultInUserProgress, { isLoading: isLoadingUpdate }] = useUpdateChallengeResultInUserProgressMutation()
  const { data: userProgress, isLoading: isUserProgressLoading, errorUserProgress } = useGetUserProgressByUserQuery()

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [challengeResults, setChallengeResults] = useState(null)
  const [isNewAttempt, setIsNewAttempt] = useState(true)

  useEffect(() => {
    if (!challnge?.questions || !userProgress)
      return

    const existingResult = userProgress?.challengeResults?.find(
      (r) => r.challenge._id.toString() === challnge._id.toString()
    )

    if (existingResult && isNewAttempt) {
      navigate(`${existingResult.challenge._id}/results`)
      return
    }

    const questionsWithAnswers = challnge.questions.map((question) => {
      const status = Math.floor(Math.random() * 2)
      const answer = {
        question: question._id,
        questionStatus: status,
        userAnswer: "",
        isCorrect: false,
        grade: 0,
      }
      return { ...question, status, answer }
    })

    setQuestions(questionsWithAnswers)
  }, [challnge, userProgress, isNewAttempt, navigate])

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1)
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const handleEnd = async () => {
    const unAnswered = questions.find((q) => q.answer.userAnswer.length === 0)
    if (unAnswered) {
      toast.error("טרם ענית על כל השאלות!!!", {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }

    let totalScore = 0
    const answers = questions.map((q) => {
      totalScore += q.answer.grade
      return q.answer
    })

    const results = { challenge: challnge._id, answers, totalScore, completedAt: null }
    setChallengeResults({ ...results })

    try {
      await updateChallengeResultInUserProgress({ challengeResults: results, categoryId }).unwrap()
      setCurrentIndex(questions.length)
      setIsNewAttempt(false)
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "שגיאה לא צפויה", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  const handleUsersAnswer = (usersAnswer) => {
    const question = questions[currentIndex]
    const isCorrect = usersAnswer === question.correctAnswer.word
    const answer = {
      question: question.answer.question,
      questionStatus: question.answer.questionStatus,
      userAnswer: usersAnswer,
      isCorrect,
      grade: isCorrect ? 10 : 0,
    }

    const updated = questions.map((q, i) => (i === currentIndex ? { ...q, answer } : q))
    setQuestions(updated)
  }

  if (isLoading || isUserProgressLoading || isLoadingUpdate) <LoadingSpinner/>
  if (error || errorUserProgress) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>

  return (
    <Box className="flex flex-col items-center p-6">
      <Paper elevation={4} className="p-8 rounded-2xl w-full max-w-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {questions[currentIndex] ? (
          <QuestionCard
            key={currentIndex}
            question={questions[currentIndex]}
            index={currentIndex + 1}
            questions={questions}
            handleUsersAnswer={handleUsersAnswer}
            setCurrentIndex={setCurrentIndex}
          />
        ) : (
          <div className="text-center space-y-4">
            <Typography variant="h6">
              במבחן הבא תצטרך להתאים בין מילים לתמונות או לבחור תשובה נכונה אחת בכל שאלה 🎯
            </Typography>
            <Button
              variant="contained"
              onClick={() => setCurrentIndex(0)}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl px-6 py-3"
            >
              התחל מבחן 🚀
            </Button>
          </div>
        )}

        {currentIndex !== -1 && currentIndex < questions.length && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outlined"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-xl border-purple-400 text-purple-600 hover:bg-purple-100"
            >
              שאלה קודמת
            </Button>
            {currentIndex === questions.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleEnd}
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl"
              >
                סיום המבחן 🏁
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-xl"
              >
                שאלה הבאה ➡️
              </Button>
            )}
          </div>
        )}

        {currentIndex === challnge?.questions?.length && challengeResults && (
          <EndModal challengeResults={challengeResults} courseId={courseId} />
        )}
        
      </Paper>
    </Box>
  )
}

export default ChallengeSection