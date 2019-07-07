const get_track_list = require('../get-tracklist.js')
const shuffle = require('lodash.shuffle')
const fs = require('fs')

get_track_list((err, tracklist) => {
  if (err) return console.log(err)

  const songs = tracklist.map(song => ({
    title: song.song,
    artist: song.artist,
    played: song.played,
    postedby: song.postedby
  }))

  fs.writeFileSync('./random-tracklist.json', JSON.stringify({songs: shuffle(songs)}))
})
