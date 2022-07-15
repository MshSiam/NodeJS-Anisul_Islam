const getAllUsers = (req, res) => {
  res.status(200).json({
    message: "All Users"
  })
}
const getOneUser = (req, res) => {
  res.status(200).json({
    message: "One User"
  })
}
const createUsers = (req, res) => {
  res.status(200).json({
    message: "One User Created"
  })
}
const updateUsers = (req, res) => {
  res.status(200).json({
    message: "One User Upadted"
  })
}
const deleteUsers = (req, res) => {
  res.status(200).json({
    message: "One User deleted"
  })
}

module.exports = {
  getAllUsers,
  createUsers,
  getOneUser,
  updateUsers,
  deleteUsers
}
