<<<<<<< HEAD
export default (theFunc) => (req, res, next) => {
=======
const catchAsyncErros = (theFunc) => (req, res, next) => {
>>>>>>> 57aaaa0f72c8200eebda9791c5ce785c6d64e485
  Promise.resolve(theFunc(req, res, next)).catch(next);
};

export default catchAsyncErros;
