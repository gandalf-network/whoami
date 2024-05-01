import "module-alias/register";
import { IncomingMessage, ServerResponse, createServer } from "http";
import next from "next";
import { parse } from "url";

import instantiateWorkers from "./src/actions/worker";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number(process.env.PORT) || 3001;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// REF: https://nextjs.org/docs/pages/building-your-application/configuring/custom-server
app.prepare().then(() => {
  createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  })
    .once("error", (err: any) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(
        `> Server listening at http://localhost:${port} as ${
          dev ? "development" : process.env.NODE_ENV
        }`,
      );
      // instantiate workers
      instantiateWorkers();
    });
});
