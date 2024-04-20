import 'module-alias/register';
import { parse } from "url"
import { IncomingMessage, ServerResponse, createServer } from "http"
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
  createServer(async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const parsedUrl = parse(req.url as string, true)
      const { pathname, query } = parsedUrl
      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err: any) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})