const config = {};

config.dbHost = process.env.dbHost || "localhost";
config.dbPort = process.env.dbPort || "27017";
config.dbName = process.env.dbName || "orders";
config.serverPort = process.env.serverPort || 3000;
config.paymentApiHost = process.env.paymentHost || "localhost";
config.paymentApiPort = process.env.paymentPort || 3001;
config.confirmTime = process.env.confirmTime || 10 * 60 * 1000; // 10 minutes by default

export default config;
