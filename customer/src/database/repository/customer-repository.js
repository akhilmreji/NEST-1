const { CustomerModel } = require('../models');
const { APIError, BadRequestError, STATUS_CODES } = require('../../utils/app-errors')

//Dealing with data base operations
class CustomerRepository {

    async CreateCustomer({ email, password,accountno, phone,salt,amount, transactions }){
        try{
            const customer = new CustomerModel({
                email,
                password,
                salt,
                phone,
                accountno,
                amount,
                transactions,
            })
            const customerResult = await customer.save();
            return customerResult;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer')
        }
    }
    
   
    async FindCustomer({ email }){
        try{
            const existingCustomer = await CustomerModel.findOne({ email: email });
            return existingCustomer;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer')
        }
    }
    async FindCustomerById({ id }){
        try{
            const existingCustomer = await CustomerModel.findOne({ _id: id });
            return existingCustomer;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer')
        }
    }
    async FindCustomerByAccount({ account }){
        try{
            const existingCustomer = await CustomerModel.findOne({ account: account });
            return existingCustomer;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer')
        }
    }
}

module.exports = CustomerRepository;