const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

mongoose.set("strictQuery", true)

app.use(express.json())
app.use(cors())

mongoose
  .connect("mongodb://127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error)

// Models
const User = require("./Models/User")

// Get All users
app.get("/users", async (req, res) => {
  const users = await User.find()

  res.json(users)
})

// Create new user
app.post("/user/new", (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    gender: req.body.gender,
  })

  user.save()

  res.json(user)
})

// Delete user by ID
app.delete("/user/delete/:id", async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id)

  res.json({ result })
})

// Update user
app.put("/user/update/:id", async (req, res) => {
  const user = await User.findById(req.params.id)

  user.firstName = req.body.firstName

  user.lastName = req.body.lastName
  user.email = req.body.email
  user.gender = req.body.gender

  user.save()

  res.json(user)
})

// Get user by ID
app.get("/user/find/:id", async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user)
})

app.listen(3001, () => {
  console.log("Server is running on port 3001")
})
