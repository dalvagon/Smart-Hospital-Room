const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "temphum",
});

async function getLatest() {
  return new Promise((resolve, reject) => {
    pool.query(
      `select temperature, humidity, recordtime from data where recordtime = (select max(recordtime) from data)`,
      async (err, res) => {
        query_response = res[0];
        const data = {
          temperature: query_response.temperature,
          humidity: query_response.humidity,
          time: query_response.recordtime,
        };

        resolve(data);
      }
    );
  });
}

async function getTemperatureHistory() {
  return new Promise((resolve, reject) => {
    pool.query(
      `select temperature, recordtime from temphum.data order by recordtime limit 200`,
      async (err, res) => {
        query_response = res;
        let data = []
        query_response.forEach(element => {
          console.log(element)
          data.push({ temperature: parseFloat(element.temperature), date: element.recordtime })
        });

        resolve(data);
      }
    );
  });
}

async function getHumidityHistory() {
  return new Promise((resolve, reject) => {
    pool.query(
      `select humidity from temphum.data`,
      async (err, res) => {
        query_response = res;
        let data = []
        query_response.forEach(element => {
          data.push({ humidity: element.humidity })
        });

        resolve(data);
      }
    );
  });
}

module.exports = {
  getLatest,
  getTemperatureHistory,
  getHumidityHistory,
};
