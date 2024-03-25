const redis = require("redis");
console.log("Attempting to connect to redis...");

const client = redis.createClient({
  password: "vauZDL2wwJT0n6jut6PJz5aUqKapCswD",
  socket: {
    host: "redis-19562.c274.us-east-1-3.ec2.cloud.redislabs.com",
    port: 19562,
  },
});

//! Connect to redis
client.on("connect", () => {
  console.log("Connected to Redis");
});
client.on("error", (e) => {
  console.log(" Redis error", e);
});

client.connect();

module.exports = client;
