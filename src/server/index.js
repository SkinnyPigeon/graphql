import express from 'express'
import path from 'path';
import helmet from 'helmet'
import cors from 'cors'
import compress from 'compression'
import services from './services'

const app = express()
const root = path.join(__dirname, '../../')
const serviceNames = Object.keys(services);

app.use(compress());
app.use(helmet());
app.use(cors());

for (let i = 0; i < serviceNames.length; i += 1) {
  const name = serviceNames[i];
  if (name === 'graphql') {
    services[name].applyMiddleware({ app });
  } else {
    app.use(`/${name}`, services[name]);
  }
}
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "*.amazonaws.com"]
  }
}))

app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));
app.get('/', (req, res) => {
  res.sendFile(path.join(root, '/dist/client/index.html'));
})
app.listen(8000, () => console.log('Listening on port 8000!'));