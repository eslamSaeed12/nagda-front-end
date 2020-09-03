import {
  AUTH_USER,
  JWT_COOKIE_CHECKER_FAIL,
  JWT_COOKIE_CHECKER_LOAD,
  JWT_COOKIE_CHECKER_SUCCESS,
  AUTH_LOGOUT_FAIL,
  AUTH_LOGOUT_LOAD,
  AUTH_LOGOUT_SUCCESS,
  FLASH_STATE,
} from "./names"
import AuthForms from "../../forms/auth-forms"
import { AuthServicesInstance } from "../../services/auth-services"
import { clientErrCatcher } from "../../utils/client-error-catcher"
export const Auth_Events = {
  FLASH_STATE_FN: () => ({ type: FLASH_STATE }),
  AUTH_USER_DATA: payload => ({ type: AUTH_USER, payload }),
  AUTH_LOGOUT_LOAD: payload => ({ type: AUTH_LOGOUT_LOAD, payload }),
  AUTH_LOGOUT_FAIL: payload => ({ type: AUTH_LOGOUT_FAIL, payload }),
  AUTH_LOGOUT_SUCCESS: payload => ({ type: AUTH_LOGOUT_SUCCESS, payload }),
  AUTH_LOGOUT_FN: () => dispatch => {
    AuthServicesInstance.logout(AuthForms.logout)
      .then(clientRes => {
        dispatch(Auth_Events.AUTH_LOGOUT_SUCCESS(true))
        dispatch(Auth_Events.JWT_COOKIE_CHECKER_SUCCESS(false))
        dispatch(Auth_Events.AUTH_USER_DATA(null))
        dispatch(Auth_Events.AUTH_LOGOUT_LOAD(true))
      })
      .catch(clientErr => {
        dispatch(Auth_Events.AUTH_LOGOUT_FAIL(clientErrCatcher(clientErr)))
        dispatch(Auth_Events.JWT_COOKIE_CHECKER_SUCCESS(false))
        dispatch(Auth_Events.AUTH_USER_DATA(null))
        dispatch(Auth_Events.AUTH_LOGOUT_LOAD(true))
      })
  },
  JWT_COOKIE_CHECKER_LOAD: payload => ({
    type: JWT_COOKIE_CHECKER_LOAD,
    payload,
  }),
  JWT_COOKIE_CHECKER_FAIL: payload => ({
    type: JWT_COOKIE_CHECKER_FAIL,
    payload,
  }),
  JWT_COOKIE_CHECKER_SUCCESS: payload => ({
    type: JWT_COOKIE_CHECKER_SUCCESS,
    payload,
  }),
  JWT_COOKIE_CHECKER_FN: () => dispatch => {
    AuthServicesInstance.jwtCoookieChecker(AuthForms.jwtCookieCheckerForm)
      .then(clientResponse => {
        const body = clientResponse.data.body
        dispatch(Auth_Events.JWT_COOKIE_CHECKER_FAIL(null))
        dispatch(Auth_Events.AUTH_USER_DATA(body))
        dispatch(Auth_Events.JWT_COOKIE_CHECKER_SUCCESS(true))
        dispatch(Auth_Events.JWT_COOKIE_CHECKER_LOAD(true))
      })
      .catch(clientErr => {
        dispatch(
          Auth_Events.JWT_COOKIE_CHECKER_FAIL(clientErrCatcher(clientErr))
        )
        dispatch(Auth_Events.JWT_COOKIE_CHECKER_LOAD(true))
        dispatch(Auth_Events.JWT_COOKIE_CHECKER_SUCCESS(false))
      })
  },
}
