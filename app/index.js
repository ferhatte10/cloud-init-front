const cors = require('cors')
const express = require('express')
const dotenv = require("dotenv")
var dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(dotenv.config())

const app = express()
const port = process.env.PORT || 8005
const path = require('path')
const morgan = require('morgan')


//setting view engine to ejs
app.set("view engine", "ejs")


app.use(express.static(path.join(__dirname, 'assets')))
app.use('/logoImages', express.static(__dirname + '/assets/images'))

app.use(cors())
app.use(morgan('combined'))

const apiUrl = process.env.API_URL || "http://localhost:3000"

//route for index page
app.get("/", function (req, res) {
  res.render("index",{API_URL: apiUrl})
})

//route for tasks page
app.get("/tasks", function (req, res) {
  // get all tasks from database and if no tasks found then send empty array
  fetch(apiUrl+"/api/task",{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => response.json())
      .then((tasks) => {
        res.render("tasks", {tasks: tasks.data || [], API_URL: apiUrl})
  }).catch((err) => {
    console.log(err)
    res.status(500).send("error while getting tasks")
  })


})


app.use(`*`, function(req, res) {
  res.status(404).send('This page is no longer available. Please go back to the <a href="/">home page</a>.')
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})