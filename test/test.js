const test = require('tape')
const getTrackList = require('../get-tracklist')
const request = require('request')
const spawn = require('child_process').spawn

test('getTrackList should return song data from google sheets', async t => {
  const songs = await getTrackList()
  t.equal(songs[0].Song, 'In The Street')
  t.end()
})

test('create-random-tracklist-file should create a file containing the randomized tracklist', t => {
  const createTrackFile = spawn('node', ['./workers/create-random-tracklist-file.js'])
  createTrackFile.stderr.pipe(process.stdout)

  createTrackFile.on('close', code => {
    t.equal(code, 0)
    const tracklist = require('../random-tracklist.json').songs
    t.equal(!!tracklist.find(song => song.title === 'David Watts'), true)
    t.end()
  })
})

const url = 'http://127.0.0.1:3000'

test('server should respond to GET / with 200', t => {
  t.plan(2)
  t.comment('Spawning server...')
  const server = spawn('node', ['./index.js'])
  server.stderr.pipe(process.stdout)
  server.stdout.on('data', data => {
    t.comment('Server should be up')
    request(url, (err, res, body) => {
      t.equal(err, null)
      t.equal(res.statusCode, 200)
      server.kill()
    })
  })
})

test('server should serve html with song list', t => {
  const server = spawn('node', ['./index.js'])
  server.stdout.on('data', data => {
    request(url, (err, res, body) => {
      t.equal(err, null)
      t.equal(body.includes('<h1>Today\'s tracklist'), true)
      t.equal(body.includes('<li>David Watts'), true)
      t.end()
      server.kill()
    })
  })
})
