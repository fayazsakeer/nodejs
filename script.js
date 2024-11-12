// const { error, log } = require("console");
const http = require("http")
const url = require("url")
const fs = require("fs")
const port = 3000;


let data = fs.readFileSync("./storage.json",{encoding:"utf8"});
let list = JSON.parse(data.length == 0 ? "[]" : data)
const server = http.createServer((req,res)=>{
    console.log(req.url);
    // res.writeHead(200,{"content-type": "text/html"});
    let parsedURL = url.parse(req.url,true);
    switch(parsedURL.pathname){
        case "/": {
            let data =fs.readFileSync("./pages/index.html",{encoding:"utf-8"});
            res.writeHead(200,{"content-type": "text/html"})
            res.write(data);
        };
        break;
        case "/add": {
            let value = parsedURL.query.str;
            console.log(value);
            list.push(value);
            fs.writeFileSync("./storage.json",JSON.stringify(list))
            res.writeHead(200,{"content-type": "application/json"});
            res.write(JSON.stringify({ msg: "str added successfully"}));
        };
        break;
        case "/get": {
            res.writeHead(200,{"content-type": "application/json"});
            res.write(JSON.stringify(list));
        };
        break;
        case "/edit":{
            let {str,index} = parsedURL.query;
            list[index] = str;
            fs.writeFileSync("./storage.json",JSON.stringify(list))
            res.writeHead(200,{"content-type": "application/json"});
            res.write(JSON.stringify({msg :"str edited succesfuly"}));

        }
        break;
        case "/delete":{
            let {str,index} = parsedURL.query;
            list = list.filter((a,i)=> i != index)
            fs.writeFileSync("./storage.json",JSON.stringify(list))
            res.writeHead(200,{"content-type": "application/json"});
            res.write(JSON.stringify({msg :"str deleted succesfuly"}));

        }
        break;
 default: res.write("page not found") 
    }
    res.end()
    
})

server.listen(port, error => {
    if(error){
        return console.log(error);
    }
    console.log(`Server started on port ${port}`);
    
})