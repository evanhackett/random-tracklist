const { GoogleSpreadsheet } = require('google-spreadsheet')

const spreadsheetId = '1P0KHudN3uGfR-GhF1VkqtscJoR2DjxU19KhmimxbB_c'
const creds = require('./client_secret.json')
const doc = new GoogleSpreadsheet(spreadsheetId)

module.exports = async function () {
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo() // have to call this first to load doc

  const sheet = doc.sheetsByIndex[0]
  return await sheet.getRows()
}
