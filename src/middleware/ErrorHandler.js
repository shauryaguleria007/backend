module.exports = (error, req, res, next) => {
  // console.log(error) //delete it
  return res.status(400).json({ message: 'internal server error' })
}
