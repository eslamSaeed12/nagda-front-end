import * as yup from "yup"

export const UPDATE_PROFILE_V = yup.object().shape({
  id: yup.string().required(),
  username: yup
    .string()
    .matches(/^([A-Z|a-z+]+(_| )+([A-Z|a-z|1-9])+)$/, {
      message: "username not follow the instructions",
    })
    .min(8)
    .max(18),
  email: yup.string().email(),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
      message: "password not follow the instructions",
    })
    .length(60),
  newPassword: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
      message: "password not follow the instructions",
    })
    .min(8)
    .max(18),
})
