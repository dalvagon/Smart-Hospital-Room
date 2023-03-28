const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "temphum",
});

async function execute() {
  return new Promise((resolve, reject) => {
    pool.query(
      `select temperature,humidity,recordtime from temphum.data where recordtime = (select max(recordtime) from temphum.data)`,
      async (err, res) => {
        query_response = res[0];
        const data = {
          temperature: query_response.temperature,
          humidity: query_response.humidity,
          time: query_response.recordtime,
        };
        console.log(data);
        resolve(data);
      }
    );
  });
}


async function getAllTemperatures() {
  return new Promise((resolve, reject) => {
    pool.query(
      `select temperature from temphum.data`,
      async (err, res) => {
        query_response = res;
        let data=[]
        query_response.forEach(element => {
            data.push(element.temperature)
        });

        resolve(data);
      }
    );
  });
}


async function getAllHumidity() {
  return new Promise((resolve, reject) => {
    pool.query(
      `select humidity from temphum.data`,
      async (err, res) => {
        query_response = res;
        let data=[]
        query_response.forEach(element => {
            data.push(element.humidity)
        });

        resolve(data);
      }
    );
  });
}
// Close the database connection

module.exports = {
  execute,
  getAllTemperatures,
  getAllHumidity,
};
