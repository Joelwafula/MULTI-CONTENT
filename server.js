const http = require('http');
const fs = require('fs');
const path  = require('path');

const PORT = 3001;

const server = http.createServer((req,res)=>{
    let filePath;
    let contentType;

    switch(req.url){
        case '/':
            filePath= path.join(__dirname,'index.html');
            contentType ='text/html';
            break;

        case '/data':
            filePath = path.join(__dirname,'data.json');
            contentType = 'application/json';
            break;

        case '/text':
            filePath = path.join(__dirname,'text.txt');
            contentType = 'text/plain';
            break;

        case '/image':
            filePath = path.join(__dirname,'image.jpg');
            contentType = 'image/jpeg';
            res.statusCode = 404;
            break;
    }
    res.setHeader('Content-Type', contentType);

    fs.readFile(filePath,(err,data)=>{
        if(err){
            res.statusCode = 500;
            res.end("Error loading file ")
            
        }else{
            res.end(data)
        }
    })
})

server.listen(PORT,()=>{
    console.log(`Server is starting at port : ${PORT}`)
})