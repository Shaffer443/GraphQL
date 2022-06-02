//testando
//console.log('hello!');

//criando servidor:

import {createServer, request} from 'http'; //nativo do NODE
import { readFile } from 'fs'; //Nativo do Node(lê arquivo e pastas)
import { resolve } from 'path'; //nativo do NODE
import { parse } from 'querystring'; //nativo do node que interpreta

const server = createServer((request, response) =>{
    switch (request.url){
        case '/status':{
            response.writeHead(200,{
                'Content-Type':'application/json',
            });
            response.write(JSON.stringify({
                status:'Rodando...',
            }));
            response.end();
            break;
        }

        case '/authenticate':{
            let date = '';
            request.on('data', (chunk) => {
                date += chunk;
            });
            request.on('end', () =>{
                const params = parse(date);
                response.writeHead(301,{
                    location: '/home',
                });
                response.end();
            });
            break;
        } 

        case '/sign-in':{
            const filePath = resolve (__dirname,'./pages/sign-in.html');
            readFile(filePath,(error, file)=>{
                if(error){
                    response.writeHead(500,'Erro de arquivo - HTML file');
                     response.end();
                    return;
                }

                response.writeHead(200);
                response.write(file);
                response.end();
            });
            break;
        }

        case '/home':{
            const Path = resolve (__dirname,'./pages/home.html');
            readFile(Path,(error, file)=>{
                if(error){
                    response.writeHead(500,'Erro de arquivo - HTML file');
                     response.end();
                    return;
                }

                response.writeHead(200);
                response.write(file);
                response.end();
            });
            break;

        }
        default: {
            response.writeHead(404);
            response.write('Problemas...');
            response.end();
            break;
        }
    }
});

// configurando as portas:

const PORT = process.env.PORT? parent(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

server.listen(PORT,HOSTNAME, ()=>{
    console.log(`Servidor http://${HOSTNAME}:${PORT} - OK! `);
});