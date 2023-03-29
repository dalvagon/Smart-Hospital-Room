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
      `select * from (select * from data order by recordtime desc limit 200) as latest order by recordtime;`,
      async (err, res) => {
        query_response = res;
        let data = []
        query_response.forEach(element => {
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
      `select * from (select * from data order by recordtime desc limit 200) as latest order by recordtime;`,
      async (err, res) => {
        query_response = res;
        let data = []
        query_response.forEach(element => {
          data.push({ humidity: parseFloat(element.humidity), date: element.recordtime })
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
