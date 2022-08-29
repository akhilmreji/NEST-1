const axios = require('axios');
const multer = require("multer");

module.exports.FormateData = (data) => { 
        if(data){
            return { data }
        }else{
            throw new Error('Data Not found!') 
        }
    }

module.exports.PublishCustomerEvent = async(payload) => {
        
        axios.post('http://localhost:8000/customer/app-events', {
                payload
        })
}

module.exports.PublishmtmxconverterEvent = async(payload) => {
        axios.post('http://localhost:8000/mt/app-events', {
                payload
        })
}
