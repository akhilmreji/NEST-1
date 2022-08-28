const { CustomerRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors')


// All Business logic will be here
class CustomerService {

    constructor(){
        this.repository = new CustomerRepository();
    }

    async SignIn(userInputs){

        const { email, password } = userInputs;
        
        try {
            
            const existingCustomer = await this.repository.FindCustomer({ email});

            if(existingCustomer){
            
                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
                
                if(validPassword){
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});
                    return FormateData({id: existingCustomer._id, token });
                } 
            }
            else{
                return FormateData({error:"data not matched"})
            }
    
            return FormateData(null);

        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    async SignUp(userInputs){
        
        const { email, password, phone,accountno } = userInputs;
        try{
            // create salt
            console.log(accountno);
            let salt = await GenerateSalt();
            
            let userPassword = await GeneratePassword(password, salt);
            const checkUser=await this.repository.FindCustomer({ email })
            if(checkUser!==null){
                  return  FormateData({ERROR:"User already exist"})
            }

            const existingCustomer = await this.repository.CreateCustomer({ email, password: userPassword,accountno, phone, salt,amount:0 });
            const token = await GenerateSignature({ email: email, _id: existingCustomer._id});
            return FormateData({id: existingCustomer._id, token });
        }catch(err){
            throw new APIError('Data Not found', err)
        }

    }
    async GetTransactionDetails(id){

        try {
            const existingCustomer = await this.repository.FindCustomerById({id});
    
            if(existingCustomer){
               return FormateData(existingCustomer);
            }       
            return FormateData({ msg: 'Error'});
            
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }
    
    async GetProfile(id){

        try {
            const existingCustomer = await this.repository.FindCustomerById({id});
            
            if(existingCustomer){
               return FormateData(existingCustomer);
            }       
            return FormateData({ msg: 'Error'});
            
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }
    
    async AddTransaction(account, transaction){
        try {
            const wishlistResult = await this.repository.AddWishlistItem(customerId, product);        
           return FormateData(wishlistResult);
    
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

    
   

    async SubscribeEvents(payload){
 
        const { event, data } =  payload;

        const { userId, product, order, qty } = data;


        switch(event){
            case 'send Transaction':
                this.ManageOrder(transaction);
                break;
            default:
                break;
        }
    }
}

module.exports = CustomerService;