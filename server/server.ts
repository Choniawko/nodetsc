import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as socketIO from "socket.io";
import * as IndexRoute from "./routes/index";

export class Server {
    private app: express.Express;
    private server: express.Express;
    private io: SocketIO.Server;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.server = require("http").Server(this.app);
        this.io = socketIO(this.server);
        this.setRoutes();
        this.setStaticRoutes();
     }

     public bootstrap(): Server {
         return new Server();
     }

     public setRoutes(): void {
         const router: express.Router = express.Router();
         router.use(IndexRoute.Index.routes());
         this.app.use(router);
     }

     private setStaticRoutes() {
        this.app.use("/node_modules", express.static(
            path.join(__dirname, "../../node_modules")
        ));
        this.app.set("views", path.join(__dirname, "../client"));
        this.app.use(express.static(path.join(__dirname, "../client")));
        this.app.engine(".html", require("ejs").__express);
        this.app.set("view engine", "html");

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
                this.io.emit("message", msg);
            });
        });
     }
}