import app from './app';
import config from './config/config';

//---- SERVER ----
const server = app.listen(config.port, () => {
  console.log(`Server online on ${config.port}`);
});

export default server;
