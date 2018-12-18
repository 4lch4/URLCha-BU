const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost/urlcha'
const connectOpts = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
}

const app = express()
const PORT = 8080

app.use(bodyParser.json())
app.listen(PORT, () => console.log(`Server is live at port ${PORT}`))

require('./models/UrlShorten')
require('./routes/urlshorten')(app)

mongoose.Promise = global.Promise
mongoose.connect(mongoURI, connectOpts, (err, db) => {
  if (err) console.error(err)
  else {
    console.log(`Connected to the DB.`)
  }
})
