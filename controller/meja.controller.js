const mejaModel = require(`../models/index`).meja;
const Op = require(`sequelize`).Op;

exports.getAllmeja = async (request, response) => {
  let mejas = await mejaModel.findAll();
  return response.json({
    success: true,
    data: mejas,
    message: `All mejas have been loaded`,
  });
};

exports.findmeja = async (request, response) => {
  let keyword = request.body.keyword;
  let mejas = await mejaModel.findAll({
    where: {
      [Op.or]: [
        { id : { [Op.substring]: keyword } },
        { nomor_meja : { [Op.substring]: keyword } }
      ],
    },
  });
  return response.json({
    success: true,
    data: mejas,
    message: `All mejas have been loaded`,
  });
};

exports.addmeja = (request, response) => {
  let newmeja = {
    nomor_meja: request.body.nomor_meja,
  };
  mejaModel
    .create(newmeja)
    .then((result) => {
      return response.json({
        success: true,
        data: result,
        message: `New meja has been inserted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.updatemeja = (request, response) => {
  let datameja = {
    id : request.body.id,
    nomor_meja: request.body.nomor_meja
  };
  let idmeja = request.params.id;
  mejaModel
    .update(datameja, { where: { id: idmeja } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data meja has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.deletemeja = (request, response) => {
  let idmeja = request.params.id;
  mejaModel
    .destroy({ where: { id: idmeja } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data meja has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
