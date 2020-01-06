import { MongoClient, Db } from 'mongodb';

let db;

export const connectDB = (url: string, dbName: string): Promise<Db> => {
  // Use connect method to connect to the server
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        console.error('MONGODB CONNECT ERROR', err);
        reject(err);
      }

      console.log('Mongodb connect success');

      db = client.db(dbName);
      resolve(db);
    });
  });
};

export const getDB = (): Db => {
  return db;
};
