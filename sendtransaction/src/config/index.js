const dotEnv  = require("dotenv");

if (process.env.NODE_ENV !== 'prod') {
    const configFile =  `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path:  configFile });
} else {
    dotEnv.config();
}
const Mongo_URI='mongodb://localhost:27017/Nest?directConnection=true'
port=5000
APP_SECRETs="R4UN4KKUM4R"
module.exports = {

    PORT: port,
    DB_URL:Mongo_URI,
    APP_SECRET: APP_SECRETs
}
 