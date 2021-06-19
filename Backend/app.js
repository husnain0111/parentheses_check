require('module-alias/register');
let express             = require('express');
let dotenv              = require('dotenv');
let expressValidator    = require('express-validator')
let path                = require('path');
let bodyParser          = require('body-parser');
let cookieParser        = require('cookie-parser');
let logger              = require('morgan');
var cors = require("cors");

// Move to their own module file

let {
  apiRouter,
} = require("./routes");


let app = express();

app.use(cors({origin: true, credentials: true}));

dotenv.load({path: '.env'});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']'
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use("/test", apiRouter);

module.exports = app;
