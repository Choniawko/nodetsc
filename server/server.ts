import * as express from "express";
import * as bodyParser from "body-parser";

export class Server {
    private app: express.Express;

    constructor() {
        this.app = express();
        this.setRoutes();
     }

     bootstrap() {
         return new Server();
     }

     public setRoutes() {
         this.app.get("/", (req: express.Request, res: express.Response) => {
            res.send("Server run!");
         });
     }

     public startServer() {
         this.app.listen(3001, () => {
             console.log("Aplication listening on 3001");
         });
     }
}