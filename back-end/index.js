require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const properties = require('./properties/properties')
const port = properties.PORT
const app = express()
const requestIp = require('request-ip');
const router = express.Router()
const routes = require('./routes/router')
const path = require('path')
const corsOptions = { origin: '*' }
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '10mb',  type: 'application/json' }));
app.use(requestIp.mw());
app.use(express.static(path.join(__dirname, '/dist')));

//app.use(middleware);
app.use(cookieParser());
app.use('/api', router);
routes(router);

app.get('*', (req, res) => {res.sendFile(path.join(__dirname, 'dist/index.html'))})

    
app.listen(port, function () {
    console.log( properties.ENV, ': Listening on port', port, '- start:', Date(Date.now()).toString()) ;
}); 
 