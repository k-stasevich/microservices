import startServer from './server';

const { PORT, SERVICE } = process.env;

startServer().then((app) => {
  return app.listen(PORT, () => {
    console.log(`${SERVICE} listening at http://localhost:${PORT}`);
  });
});
