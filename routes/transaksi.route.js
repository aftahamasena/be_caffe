const express = require(`express`)
const app = express()
app.use(express.json())
const transaksiController = require('../controller/transaksi.controller')
app.get("/", transaksiController.getAlltransaksi)
app.post("/", transaksiController.addtransaksi)
app.post("/find", transaksiController.findtransaksi)
app.put("/:id", transaksiController.updatetransaksi)
app.delete("/:id", transaksiController.deletetransaksi)
module.exports = app