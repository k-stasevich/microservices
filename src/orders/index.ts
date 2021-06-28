import startServer from './server';

const { PORT, SERVICE } = process.env;

startServer().then((app) => {
  app.listen(PORT, () => {
    console.log(`${SERVICE} listening at http://localhost:${PORT}`);
  });
});
