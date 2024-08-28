const transaksiModel = require(`../models/index`).transaksi;
const Op = require(`sequelize`).Op;

exports.getAlltransaksi = async (request, response) => {
  let transaksis = await transaksiModel.findAll();
  return response.json({
    success: true,
    data: transaksis,
    message: `All transaksis have been loaded`,
  });
};

exports.findtransaksi = async (request, response) => {
  let keyword = request.body.keyword;
  let transaksis = await transaksiModel.findAll({
    where: {
      [Op.or]: [
        { id : { [Op.substring]: keyword } },
        { tgl_transaksi : { [Op.substring]: keyword } },
        { id_user : { [Op.substring]: keyword } },
        { id_meja : { [Op.substring]: keyword } },
        { nama_pelanggan : { [Op.substring]: keyword } },
        { status : { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: transaksis,
    message: `All transaksis have been loaded`,
  });
};

exports.addtransaksi = (request, response) => {
  let newtransaksi = {
    tgl_transaksi : request.body.tgl_transaksi,
    id_user : request.body.id_user,
    id_meja : request.body.id_meja,
    nama_pelanggan : request.body.nama_pelanggan,
    status : request.body.status
  };
  transaksiModel
    .create(newtransaksi)
    .then((result) => {
      return response.json({
        success: true,
        data: result,
        message: `New transaksi has been inserted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.updatetransaksi = (request, response) => {
  let datatransaksi = {
    id : request.body.id,
    tgl_transaksi : request.body.tgl_transaksi,
    id_user : request.body.id_user,
    id_meja : request.body.id_meja,
    nama_pelanggan : request.body.nama_pelanggan,
    status : request.body.status
  };
  let idtransaksi = request.params.id;
  transaksiModel
    .update(datatransaksi, { where: { id: idtransaksi } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data transaksi has been updated`,
      });
    })
    .catch((error) => {

      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.deletetransaksi = (request, response) => {
  let idtransaksi = request.params.id;
  transaksiModel
    .destroy({ where: { id: idtransaksi } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data transaksi has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
