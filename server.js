import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/config';
import route from './routes/index';
import connectToDb from './db/connect';

const port = config.serverPort;

connectToDb();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', route);

// Index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint!');
});

app.listen(port, () => {
  console.log('server started - ', port);
});
