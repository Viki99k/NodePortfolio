// const Person = require('./person');

// const person1 = new Person("viki",22);

// person1.greetings();


const http = require('http');
const path = require('path');
const fs = require('fs');

// const server = http.createServer((req,res) => {
//     console.log(req.url);
// });


// const server = http.createServer((req,res) => {
//     if(req.url === '/'){
//         res.writeHead(200, {'Content-Type' : 'text/html'});
//         res.end('<h1>Home</h1>')
//     }
// });


// const server = http.createServer((req,res) => {
//     if(req.url === '/'){
//         fs.readFile(path.join(__dirname,'public','index.html' ), 
//         (err, content) => {
//             if(err) throw err;
//             res.writeHead(200, {'Content-Type' : 'text/html'});
//             res.end(content);

//         })
      
//     }

//     if(req.url === '/about'){
//         fs.readFile(path.join(__dirname,'public','about.html' ), 
//         (err, content) => {
//             if(err) throw err;
//             res.writeHead(200, {'Content-Type' : 'text/html'});
//             res.end(content);

//         })
       
//     }

//     if(req.url === '/api/users'){
//         const users = [
//             {name:'B S', age:40},
//             {name:'J D' , age:30}
//         ];

//         res.writeHead(200, {'Content-Type' : 'text/html'});
//         res.end(JSON.stringify(users));
//     }
// });


const server = http.createServer((req,res) => {
let filePath = path.join(__dirname, 'public' , req.url === '/' ? 'index.html' : req.url);

// console.log(filePath);
// res.end();

//ext of file 
let extName = path.extname(filePath);

//initial cone=tent type 
let contentType ='text/html';

//check ext name and set content type

switch (extName){
    case '.js':
        contentType='text/javascript';
        break;

    case '.css':
        contentType='text/css';
        break;

    case '.json':
        contentType='application/json';
        break;

    case '.png':
        contentType='image/png';
        break;

    case '.jpg':
        contentType='image/jpg';
        break;
}

//read file
fs.readFile(filePath, (err,content) => {
    if(err){
        if(err.code == 'ENOENT'){
            //page ot fount
            fs.readFile(path.join(__dirname, 'public', '404.html'), (err,content) => {
                res.writeHead(200, {'Content-Type' : 'text/html'} );
                res.end(content,'utf8');
            })
        }else{
            // some server error
            res.writeHead(5000);
            res.end(`server error : ${err.code}`);
        }
    }else{
        //success
        res.writeHead(200, {'Content-Type' : contentType});
        res.end(content,'utf8');
    }
})
    }
    )


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
})