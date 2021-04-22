import express from 'express'
import {createServer} from 'http'
import {Server, Socket} from 'socket.io'
import './database'
import  path from 'path'
import {routes} from './routes'


const app = express()
//renderizar arquivos staticos no frontend
app.use(express.static(path.join(__dirname,"..","public")))
app.set("views", path.join(__dirname,"..","public"));
app.engine("html", require("ejs").renderFile);
app.set("views engine", "html");

//rota de teste
app.get("/pages/client", (request, response)=>{
return response.render("html/client.html")
})
//criando um servido http:socket.io
const http = createServer(app); //criando o protocolo http
const io = new Server(http) //criando o protrocolo ws
//connect
io.on('connection',(socket:Socket)=>{
  //console.log("Se connectou", socket.id)
})
app.use(express.json())
app.use(routes)

export {http, io}