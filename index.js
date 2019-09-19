const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', JSON.parse(fs.readFileSync('./random-tracklist.json', 'utf8')))
})

app.listen(port, () => console.log(`listening on port ${port}`))
