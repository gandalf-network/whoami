import 'module-alias/register';
import { parse } from "url"
import { createServer } from "http"
import instantiateWorkers from './src/actions/worker';
import next from "next"
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = Number(process.env.PORT) || 3000;

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()
 
instantiateWorkers();

// REF: https://nextjs.org/docs/pages/building-your-application/configuring/custom-server
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`,
  );
});