import * as express from "express";
import * as bodyParser from "body-parser";
import * as socketIO from "socket.io";

export class Server {
    private app: express.Express;
    private server: express.Express;
    private io: SocketIO.Server;

    constructor() {
        this.app = express();
        this.server = require("http").Server(this.app);
        this.io = socketIO(this.server);
        this.setRoutes();
     }

     public bootstrap(): Server {
         return new Server();
     }

     public setRoutes(): void {
         this.app.get("/", (req: express.Request, res: express.Response) => {
            res.send("Server run!");
         });
     }

     public startServer(): void {
         this.server.listen(3001, () => {
             console.log("Aplication listening on 3001");
         });
         this.listenSocket();
     }

     private listenSocket(): void {
        this.io.on("connection", (socket) => {
            socket.on("message", (msg: string) => {
                socket.emit("message", msg);
            });
        });
     }
}