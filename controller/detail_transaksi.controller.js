const detail_transaksiModel = require(`../models/index`).detail_transaksi;
const Op = require(`sequelize`).Op;

exports.getAlldetail_transaksi = async (request, response) => {
  let detail_transaksis = await detail_transaksiModel.findAll();
  return response.json({
    success: true,
    data: detail_transaksis,
    message: `All detail_transaksis have been loaded`,
  });
};

exports.finddetail_transaksi = async (request, response) => {
  let keyword = request.body.keyword;
  let detail_transaksis = await detail_transaksiModel.findAll({
    where: {
      [Op.or]: [
        { id : { [Op.substring]: keyword } },
        { id_transaksi : { [Op.substring]: keyword } },
        { id_menu : { [Op.substring]: keyword } },
        { harga : { [Op.substring]: keyword } }
      ],
    },
  });
  return response.json({
    success: true,
    data: detail_transaksis,
    message: `All detail_transaksis have been loaded`,
  });
};

exports.adddetail_transaksi = (request, response) => {
  let newdetail_transaksi = {
    id_transaksi: request.body.id_transaksi,
    id_menu: request.body.id_menu,
    harga: request.body.harga
  };
  detail_transaksiModel
    .create(newdetail_transaksi)
    .then((result) => {
      return response.json({
        success: true,
        data: result,
        message: `New detail_transaksi has been inserted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.updatedetail_transaksi = (request, response) => {
  let datadetail_transaksi = {
    id_transaksi: request.body.id_transaksi,
    id_menu: request.body.id_menu,
    harga: request.body.harga    
  };
  let iddetail_transaksi = request.params.id;
  detail_transaksiModel
    .update(datadetail_transaksi, { where: { id: iddetail_transaksi } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data detail_transaksi has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.deletedetail_transaksi = (request, response) => {
  let iddetail_transaksi = request.params.id;
  detail_transaksiModel
    .destroy({ where: { id: iddetail_transaksi } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data detail_transaksi has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
