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

  // TODO: practice streams by getting a JSON serialize stream and piping it into an fs writeStream.
  
  fs.writeFileSync('./random-tracklist.json', JSON.stringify({songs: shuffle(songs)}))
})
