const dotEnv  = require("dotenv");

if (process.env.NODE_ENV !== 'prod') {
    const configFile =  `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path:  configFile });
} else {
    dotEnv.config();
}

port= process.env.PORT ||5003
APP_SECRETs="R4UN4KKUM4R"
module.exports = {
    PORT: port,
    APP_SECRET: APP_SECRETs
}
 