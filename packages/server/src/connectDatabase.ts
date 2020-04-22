import { config } from './config';
import { connect, connection as db } from 'mongoose';

const MONGO_URL = encodeURI(
  `mongodb+srv://${config.dbuser}:${config.dbpassword}@cluster0-c8npu.gcp.mongodb.net/test?retryWrites=true&w=majority`
);

const connectDatabase = () => {
  db.on('open', () => console.log('\x1b[33m%s\x1b[0m', 'Connected to DB!!'))
    .on('error', (err) => {
      console.error('%s', err);
    })
    .on('close', () => console.log('Database connection closed.'));
  return connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
};

export default connectDatabase;
