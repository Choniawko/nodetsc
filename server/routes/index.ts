import * as express from "express";

export class Index {
    public static routes(): express.Router {
        let router: express.Router = express.Router();
        let indexRoute: Index = new Index();
        router.get("/", indexRoute.index.bind(indexRoute));

        return router;
    }

    public index(req: express.Request, res: express.Response) {
        res.send("serwer działa.");
    }
}