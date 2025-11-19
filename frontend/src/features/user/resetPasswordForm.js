import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePasswordMutation } from "./userApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/formContainer";
import FormTitle from "../../components/formTitle";
import SubmitButton from "../../components/submitButton";
import BackButton from "../../components/backButton";
import validPassword from "../auth/service/validPassword";
import PasswordInput from "../../components/passwordInput";

const passwordSchema = z.object({
  oldPassword: z.string({ required_error: "חובה להכניס סיסמא ישנה" }).min(8, "סיסמא חייבת להכיל לפחות 8 תוים"),
  newPassword: z.string({ required_error: "חובה להכניס סיסמא חדשה " }).min(8, "סיסמא חייבת להכיל לפחות 8 תוים")
    .refine(val => validPassword(val), { message: "סיסמא חייבת להכיל אות  גדולה , קטנה ותו מיוחד" }),
  confirmPassword: z.string({ required_error: "חובה לאמת סיסמא" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "!!סיסמאת האימות אינה תואמת את הסיסמא",
  path: ["confirmPassword"],
})

const ResetPasswordForm = () => {
  const userId = useSelector((state) => state.auth.user?.id)
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(passwordSchema) })

  const onSubmit = async (data) => {
    try {
      await updatePassword({ id: userId, oldPassword: data.oldPassword, newPassword: data.newPassword }).unwrap()

      toast.success("סיסמא אופסה בהצלחה", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate("/user/profile")
      })

    } catch (err) {
      toast.error(err?.data?.message || "שגיאה באיפוס סיסמא!!", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="w-full max-w-3xl">
        <FormContainer onSubmit={handleSubmit(onSubmit)}>

          <BackButton navigation={'/user/profile'} />

          <FormTitle text={'איפוס סיסמא'} />

          <PasswordInput
            label="סיסמא ישנה"
            htmlFor="oldPassword"
            register={register("oldPassword")}
            error={errors.oldPassword?.message}
            placeholder="הכנס סיסמא ישנה"
          />

          <PasswordInput
            label="סיסמא חדשה"
            htmlFor="newPassword"
            register={register("newPassword")}
            error={errors.newPassword?.message}
            placeholder="הכנס סיסמא חדשה..."
          />

          <PasswordInput
            label="אימות סיסמא חדשה"
            htmlFor="confirmPassword"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
            placeholder="אמת סיסמא חדשה..."
          />

          <SubmitButton text="אפס סיסמא" isLoading={isLoading} />

        </FormContainer>
      </div>
    </div>
  )
}

export default ResetPasswordForm