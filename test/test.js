const test = require('tape')
const get_track_list = require('../get-tracklist')
const request = require('request')

test('get_track_list should return song data from google sheets', t => {
  get_track_list((err, songs) => {
    t.equal(songs[0].song, 'In The Street')
    t.end()
  })
})

const url = 'http://127.0.0.1:3000'

test('server should respond to GET / with 200', t => {
  t.comment('Some tests require the server to be running.')
  request(url, (err, res, body) => {
    t.equal(res.statusCode, 200)
    t.end()
  })
})

test('server should serve html with song list', t => {
  request(url, (err, res, body) => {
    t.equal(body.includes('<h1>Songs in random'), true)
    t.equal(body.includes('<li>David Watts'), true)
    t.end()
  })
})
