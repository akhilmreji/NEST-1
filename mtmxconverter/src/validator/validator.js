const path=require('path')
const fieldValidator=require('./field-validator')
const p=path.join(__dirname,'../','parser/sample/MT.txt')
const parseFormat=require('../parser/swift-parser');

const mobj=parseFormat(p);

const type=mobj.basic_header.appId
const text=mobj.text
var errors=fieldValidator(text,type).filter(f=>f!=null)
mobj.errors.push(...new Set(errors))

    



   

