const axios = require("axios");
const NewsModal = require("./Schema/Modal.jsx");
const databse = require("./Database/Collection.jsx");

const apiEndpoint = "https://newsapi.org/v2/everything?q=tesla&from=2023-11-22&sortBy=publishedAt&apiKey=2a2b8eb5b2e74194a7d60cbff09919b7";

async function fetchDataFromAPI() {
    try {
      const response = await axios.get(apiEndpoint);
  
      return response.data;
    } catch (error) {
      console.error('Error fetching data from the API:', error.message);
      throw error;
    }
  }

async function storeDataInMongoDB(data) {
  try {
    await databse.connect(); 
    await NewsModal.insertMany(data);
    console.log('Data stored in MongoDB');
  } catch (error) {
    console.error('Error storing data in MongoDB:', error.message);
    throw error;
  } finally {
    await databse.disconnect(); 
    console.log('MongoDB connection closed');
  }
}

async function main() {
  try {
    const data = await fetchDataFromAPI();
    await storeDataInMongoDB(data);
  } catch (error) {
    console.error('Main function error:', error.message);
  }
}

module.exports = main;
