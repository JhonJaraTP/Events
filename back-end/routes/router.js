const routes = require("../controllers/routes.controller");


 
module.exports = (router) => {
  MapSpRouter("/ProcessTableExecution", "spProcessTableExecution");
  MapSpRouter("/SearchEmployee", "spReadEmployee");
  MapSpRouter("/SearchGender", "spReadallGender");
  MapSpRouter("/SearchActivity", "spReadAllActivity");
  MapSpRouter("/SearchCity", "spReadAllCity");
  MapSpRouter("/CreateRegister", "spCreateRegister");
  MapSpRouter("/SearchEvent", "spReadEvent");
  MapSpRouter("/CreateResultEvent", "spCreateResultEvent");
  MapSpRouter("/SearchResultEvent", "spReadResultEvent");
  
	



  function MapSpRouter(route, spName) {
    router.post(route,   (req, res) => 
      routes.CallSp(spName, req, res)
    );
  }
  
};
