// const { error, log } = require("console");
const http = require("http")
const url = require("url")
const fs = require("fs")
const port = 3000;


let list = []
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
            res.write("str added successfully");

        };
        break;
        case "/get": {
            res.writeHead(200,{"content-type": "application/json"});
            res.write(JSON.stringify(list));
        };
        break;
        case "/del":{
            
        }
        
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