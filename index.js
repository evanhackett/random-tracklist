const express = require('express')
const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', require('./random-tracklist.json'))
})

app.listen(port, () => console.log(`listening on port ${port}`))

