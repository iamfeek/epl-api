import Router from '@koa/router';
import Koa from 'koa';
import responseTime from 'koa-response-time';
import "reflect-metadata";
import './shared/container';
import { RegisterRoutes } from "../tsoa-output/routes";

import { koaSwagger } from 'koa2-swagger-ui';

import { FixturesController } from "./controllers/fixtures.controller";
import path from 'path';

const app = new Koa();
app.use(responseTime())

const router = new Router();

RegisterRoutes(router)

app.use(router.routes());

if (process.env.NODE_ENV !== "production") {
    app.use(
        koaSwagger({
            swaggerOptions: {
                spec: require(path.join(__dirname, "../tsoa-output/swagger.json"))
            },
        }),
    );
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Now listening on :${PORT}`)
})