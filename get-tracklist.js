const GoogleSpreadsheet = require('google-spreadsheet')

const spreadsheet_id = '1P0KHudN3uGfR-GhF1VkqtscJoR2DjxU19KhmimxbB_c'
const creds = require('./client_secret.json')
const doc = new GoogleSpreadsheet(spreadsheet_id)

module.exports = function (cb) {
  doc.useServiceAccountAuth(creds, function (err) {
    if (err) return cb(err)
    doc.getRows(1, cb)
  })
}
