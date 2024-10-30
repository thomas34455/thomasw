import logo from './logo.svg';
import './App.css';
import { useState } from "react";

// Import the web3 module
import Web3 from "web3";

// Import the con0xf8621C399aa438A8006803207EF7149B4F8ddE2Btract address and the ABI
const ADDRESS = "0xf8621C399aa438A8006803207EF7149B4F8ddE2B";
const ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_location", "type": "string" },
      { "internalType": "uint256", "name": "_price", "type": "uint256" }
    ],
    "name": "addProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "index", "type": "uint256" }
    ],
    "name": "markAsSold",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "index", "type": "uint256" }
    ],
    "name": "removeProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "index", "type": "uint256" },
      { "internalType": "uint256", "name": "newPrice", "type": "uint256" }
    ],
    "name": "updateProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "index", "type": "uint256" }
    ],
    "name": "getProperty",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "propertyCount",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ],
    "name": "properties",
    "outputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "location", "type": "string" },
      { "internalType": "uint256", "name": "price", "type": "uint256" },
      { "internalType": "bool", "name": "isSold", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function App() {
  const [propertyName, setPropertyName] = useState("");
  const [propertyLocation, setPropertyLocation] = useState("");
  const [propertyPrice, setPropertyPrice] = useState("");
  const [propertyIndex, setPropertyIndex] = useState("");
  const [propertyCount, setPropertyCount] = useState(0);
  const [propertyDetails, setPropertyDetails] = useState(null);

  // Initialize web3 object
  const web3 = new Web3(window.ethereum);

  // Initialize contract with ABI and ADDRESS
  const propertyContract = new web3.eth.Contract(ABI, ADDRESS);

  // Get the number of properties
  async function fetchPropertyCount() {
    const count = await propertyContract.methods.propertyCount().call();
    setPropertyCount(count);
  }

  // Add a new property
  async function addProperty() {
    const accounts = await web3.eth.requestAccounts();
    await propertyContract.methods.addProperty(propertyName, propertyLocation, propertyPrice).send({ from: accounts[0] });
    fetchPropertyCount();
  }

  // Mark property as sold
  async function markAsSold() {
    const accounts = await web3.eth.requestAccounts();
    await propertyContract.methods.markAsSold(propertyIndex).send({ from: accounts[0] });
  }

  // Remove a property
  async function removeProperty() {
    const accounts = await web3.eth.requestAccounts();
    await propertyContract.methods.removeProperty(propertyIndex).send({ from: accounts[0] });
    fetchPropertyCount();
  }

  // Update property price
  async function updateProperty() {
    const accounts = await web3.eth.requestAccounts();
    await propertyContract.methods.updateProperty(propertyIndex, propertyPrice).send({ from: accounts[0] });
  }

  // Get property details
  async function getProperty() {
    const details = await propertyContract.methods.getProperty(propertyIndex).call();
    setPropertyDetails(details);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1>Property Management App</h1>

        <button onClick={fetchPropertyCount}>Fetch Property Count</button>
        <p>Property Count: {propertyCount}</p>

        <h2>Add Property</h2>
        <input
          type="text"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
          placeholder="Enter property name"
        />
        <input
          type="text"
          value={propertyLocation}
          onChange={(e) => setPropertyLocation(e.target.value)}
          placeholder="Enter property location"
        />
        <input
          type="number"
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(e.target.value)}
          placeholder="Enter property price"
        />
        <button onClick={addProperty}>Add Property</button>

        <h2>Manage Property</h2>
        <input
          type="number"
          value={propertyIndex}
          onChange={(e) => setPropertyIndex(e.target.value)}
          placeholder="Enter property index"
        />
        <button onClick={markAsSold}>Mark as Sold</button>
        <button onClick={removeProperty}>Remove Property</button>
        <input
          type="number"
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(e.target.value)}
          placeholder="New property price"
        />
        <button onClick={updateProperty}>Update Property Price</button>

        <h2>Get Property Details</h2>
        <button onClick={getProperty}>Get Property</button>
        {propertyDetails && (
          <div>
            <p>Name: {propertyDetails[0]}</p>
            <p>Location: {propertyDetails[1]}</p>
            <p>Price: {propertyDetails[2]}</p>
            <p>Is Sold: {propertyDetails[3] ? "Yes" : "No"}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
