// const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class mtmxconversionervice {

    // constructor(){
    //     this.repository = new ProductRepository();
    // }

   
    async MtMxConversion(MtInputs){
        try{
            const mtmxconversion = await this.repository.MtMxConversion(MtInputs);
           
            return FormateData(mtmxconversion)

        }catch(err){
            throw new APIError('Data Not found')
        }
    }


   
 
     
}

module.exports = mtmxconversionervice;