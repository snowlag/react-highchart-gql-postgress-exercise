// script to push data.json into your database
const { Client } = require("pg");
const fs = require("fs");

// Read the JSON data
const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

// PostgreSQL connection setup
// insert this in env file
const client = new Client({
  user: "",
  host: "",
  database: "",
  password: "",
  port: 5432,
});

async function insertData() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");

    for (const security of data) {
      await client.query(
        `INSERT INTO security (ticker, security_name, sector, country, trend, prices)
                VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          security.ticker,
          security.securityName,
          security.sector,
          security.country,
          security.trend,
          JSON.stringify(security.prices),
        ]
      );
      console.log(`Inserted data for ${security.ticker}`);
    }
  } catch (err) {
    console.error("Error inserting data:", err.stack);
  } finally {
    await client.end();
    console.log("Connection closed");
  }
}

insertData();
