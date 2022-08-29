// const { ProductRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');
const multer = require("multer");
 
// All Business logic will be here
class mtvalidationervice {

    // constructor(){
    //     this.repository = new ProductRepository();
    // }

    async MTvalidation(MtInputs){
        try{
            const productResult = await this.repository.MTvalidation(MtInputs)
            return FormateData(productResult);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
    
    async mtvalidation(MtInputs){
        try{
            const mtvalidation = await this.repository.mtvalidation(MtInputs);
           
            return FormateData(mtvalidation)

        }catch(err){
            throw new APIError('Data Not found')
        }
    }


    async GetProductDescription(productId){
        try {
            const product = await this.repository.FindById(productId);
            return FormateData(product)
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

   


    
     
}

module.exports = mtvalidationervice;