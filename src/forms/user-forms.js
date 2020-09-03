export default {
  updateProfile: (data) => ({
    method: "PATCH",
    url: `${process.env.REACT_APP_API}/profile`,
    data,
  }),
};
