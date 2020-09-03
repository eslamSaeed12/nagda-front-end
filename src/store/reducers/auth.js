import ini from "../config/ini-store"
import {
  AUTH_USER,
  JWT_COOKIE_CHECKER_FAIL,
  JWT_COOKIE_CHECKER_LOAD,
  JWT_COOKIE_CHECKER_SUCCESS,
  AUTH_LOGOUT_FAIL,
  AUTH_LOGOUT_LOAD,
  AUTH_LOGOUT_SUCCESS,
  FLASH_STATE,
} from "../actions/names"

export const auth = (state = ini.auth, action) => {
  switch (action.type) {
    case FLASH_STATE:
      return {
        ...state,
        AUTH_USER_DATA: null,
        LOGOUT_LOAD: null,
        LOGOUT_FAIL: null,
        LOGOUT_SUCCESS: null,
        JWT_COOKIE_CHECKER_LOAD: null,
        JWT_COOKIE_CHECKER_FAIL: null,
        JWT_COOKIE_CHECKER_SUCCESS: null,
      }
    case AUTH_USER:
      return { ...state, AUTH_USER_DATA: action.payload }
    case JWT_COOKIE_CHECKER_LOAD:
      return { ...state, JWT_COOKIE_CHECKER_LOAD: action.payload }
    case JWT_COOKIE_CHECKER_FAIL:
      return { ...state, JWT_COOKIE_CHECKER_FAIL: action.payload }
    case JWT_COOKIE_CHECKER_SUCCESS:
      return { ...state, JWT_COOKIE_CHECKER_SUCCESS: action.payload }
    case AUTH_LOGOUT_LOAD:
      return { ...state, LOGOUT_LOAD: action.payload }
    case AUTH_LOGOUT_FAIL:
      return { ...state, LOGOUT_FAIL: action.payload }
    case AUTH_LOGOUT_SUCCESS:
      return { ...state, LOGOUT_SUCCESS: action.payload }
  }

  return state
}
