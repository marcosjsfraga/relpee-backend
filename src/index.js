const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Cryptr = require('cryptr');
const routes = require('./routes');

require('./database');

const app = express();

// Password Secret Key
global.cryptr = new Cryptr('i=*lyrck40j=2o!@hwf5[$x4hcw7u40!#15r64uc7s-gr+[oo5');

app.use(cors({
    // origin: ""
}));

app.use(express.json()); // <- Show Express how handle with JSON request
app.use(express.urlencoded({ extended: true })); // <- Show Express how handle with UrlEncoded request
app.use(morgan('dev')); // <- Logs Lib
app.use(routes);

app.listen(process.env.PORT || 3000);
