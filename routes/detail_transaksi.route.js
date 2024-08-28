const express = require(`express`)
const app = express()
app.use(express.json())
const detail_transaksiController = require('../controller/detail_transaksi.controller')
app.get("/", detail_transaksiController.getAlldetail_transaksi)
app.post("/", detail_transaksiController.adddetail_transaksi)
app.post("/find", detail_transaksiController.finddetail_transaksi)
app.put("/:id", detail_transaksiController.updatedetail_transaksi)
app.delete("/:id", detail_transaksiController.deletedetail_transaksi)
module.exports = app

