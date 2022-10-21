const sql = require("./sql.controller");
const parametros = require("./params.controller").parametros;

exports.CallSp = (spName, req, res) => {
  if (isEmpty(req.body)) {
    sql
    .query(spName, null)
    .then((resultado) => {
      responsep(1, req, res, resultado);
    })
    .catch((err) => {
      console.log(err);
      {
        responsep(2, req, res, err);
      }
    });
  } else {
    sql
    .query(spName, parametros(req.body, spName))
    .then((result) => {
      responsep(1, req, res, result);
    })
    .catch((err) => {
      responsep(2, req, res, err);
    });
  }
};

function isEmpty(req){
  for(var key in req){
    if(req.hasOwnProperty(key))
      return false;
  }
  return true;
}


let responsep = (tipo, req, res, resultado, cookie) => {
  return new Promise((resolve, reject) => {
    if (tipo == 1) {
      res.status(200).json(resultado);
    } else if (tipo == 2) {
      console.log("Error at:", date, "res: ", resultado);
      res.status(400).json(resultado);
    }
  });
};
