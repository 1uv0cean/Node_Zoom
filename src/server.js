import http from "http"
import WebSocket from "ws";
import express from "express"

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/",(_,res) => res.render("home"))
app.get("/*",(_,res) => res.redirect("/"))

const handleListen = () => console.log(`Listning on http://localhost:3000`)

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on("connection", (socket) =>{
    console.log("Connected to Browser✅")
    socket.on("close", () => console.log("Disconnected from the Browser❌"))
    socket.on("message", (message) =>{
        console.log(message.toString('utf-8'))
    })
    socket.send("Hello!")
})

server.listen(3000, handleListen)