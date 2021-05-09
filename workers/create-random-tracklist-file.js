const getTrackList = require('../get-tracklist.js')
const shuffle = require('lodash.shuffle')
const fs = require('fs')
const path = require('path')

// wrapping code in async function so we can use await (no await at top level)
async function run () {
  const tracklist = await getTrackList()

  const songs = tracklist.map(song => ({
    title: song.Song,
    artist: song.Artist,
    played: song['Played?'],
    postedby: song['Posted by']
  }))

  const filePath = path.join(__dirname, '../random-tracklist.json')
  console.log('writing random tracklist to: ', filePath)

  fs.writeFileSync(filePath, JSON.stringify({ songs: shuffle(songs) }))
}

run()
