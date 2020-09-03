import * as yup from "yup"

export const Create_Feedback = yup.object().shape({
  reason: yup
    .string()
    .matches(/^([a-zA-Z]+)$/, { message: "من فضلك اتبع التعليمات الصحيحه" })
    .oneOf(["suggestion", "problem", "error", "message"])
    .required(),
  email: yup.string().email().required(),
  message: yup
    .string()
    .min(30)
    .max(800)
    .matches(/^([a-zA-Z 1-9]+)$/, {
      message: "من فضلك اتبع التعليمات الصحيحه ",
    })
    .required(),
})
