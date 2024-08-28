const menuModel = require(`../models/index`).menu;
const Op = require(`sequelize`).Op;

exports.getAllmenu = async (request, response) => {
  let menus = await menuModel.findAll();
  return response.json({
    success: true,
    data: menus,
    message: `All menus have been loaded`,
  });
};

exports.findmenu = async (request, response) => {
  let keyword = request.body.keyword;
  let menus = await menuModel.findAll({
    where: {
      [Op.or]: [
        { id: { [Op.substring]: keyword } },
        { nama_menu : { [Op.substring]: keyword } },
        { jenis : { [Op.substring]: keyword } },
        { deskripsi : { [Op.substring]: keyword } },
        { gambar : { [Op.substring]: keyword } },
        { harga : { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: menus,
    message: `All menus have been loaded`,
  });
};

exports.addmenu = (request, response) => {
  let newmenu = {
    nama_menu: request.body.nama_menu,
    jenis: request.body.jenis,
    deskripsi: request.body.deskripsi,
    gambar: request.body.gambar,
    harga: request.body.harga
  };
  menuModel
    .create(newmenu)
    .then((result) => {
      return response.json({
        success: true,
        data: result,
        message: `New menu has been inserted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.updatemenu = (request, response) => {
  let datamenu = {
    id: request.body.id,
    nama_menu: request.body.nama_menu,
    jenis: request.body.jenis,
    deskripsi: request.body.deskripsi,
    gambar: request.body.gambar,
    harga: request.body.harga,
  };
  let idmenu = request.params.id;
  menuModel
    .update(datamenu, { where: { id: idmenu } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data menu has been updated`,
      });
    })
    .catch((error) => {

      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.deletemenu = (request, response) => {
  let idmenu = request.params.id;
  menuModel
    .destroy({ where: { id: idmenu } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data menu has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
