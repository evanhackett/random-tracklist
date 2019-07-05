const get_track_list = require('./get-tracklist')
const express = require('express')
const shuffle = require('lodash.shuffle')
const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  get_track_list((err, songs) => {
    if (err) {
      console.log(err)
      return res.send(400)
    }
    res.render('index', {songs: shuffle(songs)})
  })

})

app.listen(port, () => console.log(`listening on port ${port}`))

