const TYPES = require("tedious").TYPES;
const moment = require("moment");

let parametrizacion = (data) => {
  // console.log(data)
  try {
    let obj = {
      table: [],
    };
    data.forEach((dato) => {
      let nombre = dato.item;
      let valor = dato.datos.valor;
      let tipo = dato.datos.tipo;
      //console.log(nombre, valor, tipo)
      if (tipo == "varchar") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.VarChar });
      } else if (tipo == "int") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Int });
      } else if (tipo == "bit") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Bit });
      } else if (tipo == "date") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Date });
      } else if (tipo == "datetime") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.DateTime });
      } else if (tipo == "time") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Time });
      } else if (tipo == "char") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Char });
      } else if (tipo == "decimal") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.Decimal });
      } else if (tipo == "bigint") {
        obj.table.push({ nombre: nombre, valor: valor, tipo: TYPES.BigInt });
      }
    });
    return obj.table;
  } catch (error) {
    console.log("Errores "+error);
    return error;
  }
};

exports.parametros = (req, tipo) => {
  // console.log('Datos de llegada: '+req.Creator)
  switch (tipo) {


    case "spReadEmployee":
      return parametrizacion([
        { item: "CCMSID", datos: { valor: req.CCMSID, tipo: "int" } },
        { item: "IdEvent", datos: { valor: req.IdEvent, tipo: "int" } }
      ]);

    case "spReadEvent":
      return parametrizacion([
        { item: "Id", datos: { valor: req.Id, tipo: "int" } }
      ]);
    case "spReadResultEvent":
      return parametrizacion([
        { item: "Id", datos: { valor: req.Id, tipo: "int" } }
      ]);

    case "spReadEmployee":
      return parametrizacion([
        { item: "CCMSID", datos: { valor: req.CCMSID, tipo: "int" } },
        { item: "IdEvent", datos: { valor: req.IdEvent, tipo: "int" } }
      ]);
    case "spCreateRegister": 
      return parametrizacion([
        { item: "CCMSID", datos: { valor: req.CCMSID, tipo: "int" } },
        { item: "Name", datos: { valor: req.Name, tipo: "varchar" } },
        { item: "IdFical", datos: { valor: req.IdFical, tipo: "int" } },
        { item: "IdCity", datos: { valor: req.IdCity, tipo: "int" } },
        { item: "IdGender", datos: { valor: req.IdGender, tipo: "int" } },
        { item: "Age", datos: { valor: req.Age, tipo: "int" } },
        { item: "IdEvent", datos: { valor: req.IdEvent, tipo: "int" } }
      ]);
    case "spCreateResultEvent": 
      return parametrizacion([
        { item: "IdRegister", datos: { valor: req.IdRegister, tipo: "int" } },
        { item: "IdActivity", datos: { valor: req.IdActivity, tipo: "int" } },
        { item: "Result", datos: { valor: req.Result, tipo: "int" } }
      ]);


    default:
      break;
  }
  var size = Object.keys(req.body).length;
  if (size == 0) {
    return [];
  }
};
