const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  fs.readFile('./random-tracklist.json', 'utf8', (err, txt) => {
    if (err) return res.status(500).end('error')

    res.render('index', JSON.parse(txt))
  })
})

app.listen(port, () => console.log(`listening on port ${port}`))
