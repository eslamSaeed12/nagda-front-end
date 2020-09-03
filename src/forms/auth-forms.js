export default {
  login: (body) => ({
    method: "POST",
    data: body,
    url: `${process.env.REACT_APP_API}/login`,
  }),
  jwtCookieCheckerForm: {
    method: "GET",
    url: `${process.env.REACT_APP_API}/anti-forgery`,
  },
  logout: {
    method: "POST",
    url: `${process.env.REACT_APP_API}/logout`,
  },
  passordConfrimation: (data) => ({
    method: "POST",
    url: `${process.env.REACT_APP_API}/confirm-me`,
    data,
  }),
};
