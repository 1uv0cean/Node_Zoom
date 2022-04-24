import http from "http"
import WebSocket from "ws"
import express from "express"
import SocketIO from "socket.io"

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/",(_,res) => res.render("home"))
app.get("/*",(_,res) => res.redirect("/"))

const handleListen = () => console.log(`Listning on http://localhost:9999`)

const httpServer = http.createServer(app)
const wsServer = SocketIO(httpServer)

wsServer.on("connection", socket => {
    socket.onAny((event) =>{
        console.log(`Socket Event: ${event}`)
    })
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName)
        done()
        socket.to(roomName).emit("welcome")
    })
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("bye"))
    })
})

/*
const wss = new WebSocket.Server({ server })

const sockets = []

wss.on("connection", (socket) =>{
    sockets.push(socket)
    socket["nickname"] = "익명"
    console.log("Connected to Browser✅")
    socket.on("close", onSocketClose)
    socket.on("message", (msg) =>{
        msg = msg.toString('utf-8')
        const message = JSON.parse(msg)
        switch(message.type){
            case "new_message":
                sockets.forEach((aSocket) => 
                aSocket.send(`${socket.nickname}: ${message.payload}`)
                )
            case "nickname":
                socket["nickname"] = message.payload
        }
    })
})
*/

httpServer.listen(9999, handleListen)