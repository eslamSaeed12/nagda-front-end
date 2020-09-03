export default {
  getNearestPoint: (data) => ({
    method: "POST",
    url: `${process.env.REACT_APP_API}/station/nearest`,
    data,
  }),

  getAllPoints: {
    method: "GET",
    url: `${process.env.REACT_APP_API}/station`,
    withCredentials: true,
  },
};
