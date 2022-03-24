import app from './app';
// import { checkingEnvVariables } from './config/checking-env-variables';
// import { startDbConnection } from './config/sequelize';
// import Logger from './src/middlewares/logger';

// const start = async() => {
//   checkingEnvVariables();
//   await startDbConnection();
  const port=8000

app.listen(port, () =>
  console.log(`your server is running at http://localhost:${port}`)
);


