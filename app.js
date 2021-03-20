const express = require('express')
const userRegistrationroutes = require('./routes/newUserroute')
const waterLevelroutes = require('./routes/waterLevelroute')
const motorSwitchroutes = require('./routes/motorSwitchroute')
const database = require('./config/database')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

app.use(bodyParser.json())
app.use('/api',userRegistrationroutes)
app.use('/api/waterlevel',waterLevelroutes)
app.use('/api/motor',motorSwitchroutes)




database.connect().then(
    app.listen(process.env.PORT || 8000)
).catch((error) => {
    console.log(error)
})