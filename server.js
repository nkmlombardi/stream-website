var express = require('express')
var morgan = require('morgan')
var fs = require('fs')
var app = express()
var bodyParser = require('body-parser')

var autosave = '../../Programs/Streamlabs Chatbot/Services/Scripts/streamlabs-chatbot-queue-system/autosave.json'

// Logging
app.use(morgan('short'))

// Cross Origin Requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Static asse ts
app.use(express.static('./'))
app.use('/vendor', express.static('./node_modules'))

app.get('/data', function (req, res) {
    res.json(data || [])
})

app.post('/save', function(req, res) {
    var duplicate = data.queue.findIndex(function(player) {
        return player.user === req.body.user || player.ign === req.body.ign
    })

    if (duplicate === -1) {
        data.queue.push(req.body)
        fs.writeFileSync(autosave, JSON.stringify(data), 'utf8')
    }
})

var data = false

var interval = setInterval(function() {
    try {
        data = JSON.parse(fs.readFileSync(autosave, 'utf8'))
    } catch(e) {
        console.log('Error:', e.stack)
    }
}, 5000)

// Launch server
app.listen(3000, () => {
    console.log('Dashboard process listening on port ' + 3000 + '!')
})
