const get_track_list = require('./get-tracklist')

get_track_list((err, songs) => {
  songs.forEach(song => {
    console.log(song.song)
  })
})
