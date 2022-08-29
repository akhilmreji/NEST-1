// const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');
const axios = require('axios');

// All Business logic will be here
class mtmxconverterervice {
   
    async mtmxconverter(MtInputs){
        try{
            const mtmxconverter = await this.repository.mtmxconverter(MtInputs);
           
            return FormateData(mtmxconverter)

        }catch(err){
            throw new APIError('Data Not found')
        }
    }


   
 
     
}

module.exports = mtmxconverterervice;