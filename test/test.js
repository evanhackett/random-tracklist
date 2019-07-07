const test = require('tape')
const get_track_list = require('../get-tracklist')
const request = require('request')
const spawn = require('child_process').spawn

test('get_track_list should return song data from google sheets', t => {
  get_track_list((err, songs) => {
    t.equal(songs[0].song, 'In The Street')
    t.end()
  })
})

test('create-random-tracklist-file should create a file containing the randomized tracklist', t => {
  const create_track_file = spawn('node', ['./workers/create-random-tracklist-file.js'])
  create_track_file.stderr.pipe(process.stdout)

  create_track_file.on('close', code => {
    t.equal(code, 0)
    const tracklist = require('../random-tracklist.json').songs
    t.equal(tracklist.find(song => song.title === 'David Watts') ? true : false, true)
    t.end()
  })

})

const url = 'http://127.0.0.1:3000'

test('server should respond to GET / with 200', t => {
  t.plan(1)
  t.comment('Spawning server...')
  const server = spawn('node', ['./index.js'])
  server.stderr.pipe(process.stdout)
  server.stdout.on('data', data => {
    t.comment('Server should be up')
    request(url, (err, res, body) => {
      t.equal(res.statusCode, 200)
      server.kill()
    })
  })
})

test('server should serve html with song list', t => {
  const server = spawn('node', ['./index.js'])
  server.stdout.on('data', data => {
    request(url, (err, res, body) => {
      t.equal(body.includes('<h1>Today\'s random tracklist'), true)
      t.equal(body.includes('<li>David Watts'), true)
      t.end()
      server.kill()
    })
  })
})
