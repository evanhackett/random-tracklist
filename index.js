const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'random-tracklist.json'), 'utf8', (err, txt) => {
    if (err) return res.status(500).end('error')

    res.render('index', JSON.parse(txt))
  })
})

app.listen(port, () => console.log(`listening on port ${port}`))
