import * as yup from "yup"

export const getRoutesSchema = yup.object().shape({
  profile: yup.string().oneOf(["driving", "walking", "cycling"]).required(),
  origin: yup.string().required(),
  target: yup.string().required(),
})
