const test = require('tape')
const get_track_list = require('../get-tracklist')

test('get_track_list should return song data from google sheets', t => {
  get_track_list((err, songs) => {
    t.equal(songs[0].song, 'In The Street')
    t.end()
  })
})
