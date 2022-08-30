const regexMap = require("./util/pattern");

const fieldTags=["13C","20","23B","23E","26T","32A","33B","36","50A","50F","50K","51A","52A","52D","53A","53B","53D","54A","54B","54D","55A","55B","55D","56A","56C","56D","57A","57B","57C","57D","59","59A","59F","70","71A","71F","71G","72","77B"] 
const mandTags=["20","23B","32A","59A","71A"];
const XRegExp = require('xregexp');//cont regexMap
const { exec } = require("xregexp");
const incorrectTag=(tagarray)=>
{
    
    var res;
    tagarray.forEach(tag=>
        {
            if(!fieldTags.includes(tag))
            {   
                
                res=tag;
                return;
            }
        })
        return res;
}
const duplicatTags=(tagarray)=>
{
    if (tagarray.length !== new Set(tagarray).size) 
    {
        return true;
    }
    
    return false;
}

module.exports = (text) => {
    var errors=[]
    const fieldArray = text.slice(3).split('\n');
    var tagArray=[];
    var currTag;
    var curTagisNull = 0;
    var fieldarr = []
    var invalid=0;
    fieldArray.forEach(field=>
        {
            if (field.charAt(0) == ':')
            tagArray.push(field.slice(1).split(":")[0])
        })
    
        
    fieldArray.forEach(field => {
        if(field==='-'){}
        else if (field.charAt(0) == ':') 
        {
            var f = field.slice(1).split(":");
            try {
                if (f[0]==="50F") {
                    
                    if (f[1].charAt(0) === '/') {
                        
                        
                        var attr = XRegExp.exec(f[1],regexMap.get("50F1")[0])
                        //console.log(attr)
                        fieldarr.push({ tag: f[0], attr: attr.groups })
                        curTagisNull = 0;
                    }
                    else {
                        
                        var attr = XRegExp.exec(f[1], regexMap.get("50F2")[0])
                        fieldarr.push({ tag: f[0], attr: attr.groups })
                        curTagisNull = 0;
                    }
                    currTag="50F"
                    invalid=0;
                }
                else if (regexMap.get(f[0])) 
                {
                    
                        var attr = XRegExp.exec(f[1], regexMap.get(f[0])[0] == null ? regexMap.get(f[0]) : regexMap.get(f[0])[0])
                        fieldarr.push({ tag: f[0], attr: attr.groups });
                       
                        curTagisNull = 0;
                        invalid=0;
                }
                else 
                {
                    curTagisNull = 1;
                    invalid=0;
                }
                currTag = f[0];
                }
                catch(err)
                {
                    
                    errors.push("Error in Tag: "+f[0])
                    //console.log(f[1])
                    invalid=1;
                }
            }
        
        else
            {
                if (!curTagisNull&&invalid==0) 
                {
                    try{
                    
                    if (!fieldarr[fieldarr.length - 1].data) 
                    {
                        fieldarr[fieldarr.length - 1].data = []
                    }
                    
                    var attr = XRegExp.exec(field,regexMap.get(currTag)[1])
                    
                    if(attr)fieldarr[fieldarr.length - 1].data.push(attr.groups);
                    }
                    catch(err){
                        //console.log(err)
                        console.log("error in :"+currTag)
                        console.log(fieldarr.length)
                    }
                }
            }
        
    })
    console.log(tagArray)
    const r=incorrectTag(tagArray)
    console.log(r)
    if(r)errors.push("Some tags are invalid:"+r)
    if(duplicatTags(tagArray))errors.push("Duplicate Tags")
    errors=[...new Set(errors)]
    return {fieldarr,errors};
}