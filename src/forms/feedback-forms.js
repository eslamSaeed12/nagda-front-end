export default {
  postFeedbacck: (data) => ({
    method: "POST",
    url: `${process.env.REACT_APP_API}/feedback`,
    data,
  }),
};
