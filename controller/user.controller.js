const userModel = require(`../models/index`).user;
const Op = require(`sequelize`).Op;
const md5 = require("md5");
const jsonwebtoken = require("jsonwebtoken");

exports.getAlluser = async (request, response) => {
  let users = await userModel.findAll();
  return response.json({
    success: true,
    data: users,
    message: `All users have been loaded`,
  });
};

exports.finduser = async (request, response) => {
  let keyword = request.body.keyword;
  let users = await userModel.findAll({
    where: {
      [Op.or]: [
        { id: { [Op.substring]: keyword } },
        { nama_user: { [Op.substring]: keyword } },
        { role: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: users,
    message: `All users have been loaded`,
  });
};

exports.login = async (request, response) => {
  try {
    const params = {
      username: request.body.username,
      password: md5(request.body.password),
    };

    const finduser = await userModel.findOne({ where: params });
    if (finduser == null) {
      return responese.status(400).json({
        message: "username or password doesn't match",
      });
    }
    let tokenPlayLoad = {
      id: finduser.id,
      username: finduser.username,
      role: finduser.role,
      nama_user: finduser.nama_user,
    };
    tokenPlayLoad = JSON.stringify(tokenPayLoad);
    let token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY);

    return response.status(200).json({
      message: "succes login",
      data: {
        token: token,
        id: findUser.id,
        nama_user: findUser.nama_user,
        username: findUser.username,
        role: findUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(400).json({
      message: error,
    });
  }
};

exports.LoginRegister = async (request, response) => {
  const username = request.body.username;
  let user = await userModel.findAll({
    where: { role: "manajer", username: username },
  });
  if (json.length == 0) {
    let newUser = {
      name_user: request.body.nama_user,
      foto: request.body.linkFoto,
      username: username,
      role: "manajer",
    };
    if (newUser.nama_user === "" || newUser === "") {
      return response.status(400).json({
        succes: false,
        message: "Harus diisi semua",
      });
    } else {
      userModel.create(newUser).then((result) => {
        return response.json({
          succes: true,
          data: result,
          message: "new user has ben inserted",
        });
      });
    }
  }
};

exports.adduser = (request, response) => {
  let newuser = {
    nama_user: request.body.nama_user,
    role: request.body.role,
    username: request.body.username,
    password: request.body.password,
  };
  userModel
    .create(newuser)
    .then((result) => {
      return response.json({
        success: true,
        data: result,
        message: `New user has been inserted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.updateuser = (request, response) => {
  let datauser = {
    id: request.body.id,
    nama_user: request.body.nama_user,
    role: request.body.role,
    username: request.body.username,
    password: request.body.password,
  };
  let iduser = request.params.id;
  userModel
    .update(datauser, { where: { id: iduser } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data user has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.deleteuser = (request, response) => {
  let iduser = request.params.id;
  userModel
    .destroy({ where: { id: iduser } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data user has been updated`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
