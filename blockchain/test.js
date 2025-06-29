const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Setup Web3 with Ganache RPC
const web3 = new Web3("http://127.0.0.1:7545");

// Replace with your Ganache account and private key
const publicKey = "0xC08eaFa08d033c00516e00818B50C628CF97Df86";
const privateKey =
  "0xa5771901ab0c2573b075ad3a329caaae3e16e9567c2b0ad6d6a3b66592042ce9";

// Load ABI and contract address from build file
const CertificateRegistry = JSON.parse(
  fs.readFileSync(
    "../blockchain/truffle/build/contracts/CertificateRegistry.json",
    "utf8"
  )
);

const abi = contractJson.abi;
const networkId = Object.keys(contractJson.networks)[0]; // Assume first network (e.g., 5777)
const contractAddress = contractJson.networks[networkId].address;

const certificateContract = new web3.eth.Contract(abi, contractAddress);

// Function to add certificate
async function addCertificate(certHash, keys, values) {
  try {
    const tx = certificateContract.methods.addCertificate(
      certHash,
      keys,
      values
    );
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(publicKey, "latest");
    const gas = await tx.estimateGas({ from: publicKey });
    const gasPrice = await web3.eth.getGasPrice();

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: contractAddress,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: 1337, // Ganache chain ID
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("✅ Certificate added. TX Hash:", receipt.transactionHash);
  } catch (err) {
    console.error("❌ Error adding certificate:", err.message);
  }
}

// Function to verify certificate
async function verifyCertificate(certHash) {
  try {
    const result = await certificateContract.methods
      .verifyCertificate(certHash)
      .call();
    console.log(`\n🔍 Certificate Data for hash: ${certHash}`);
    result[0].forEach((key, index) => {
      console.log(`${key}: ${result[1][index]}`);
    });
  } catch (err) {
    console.error("❌ Error verifying certificate:", err.message);
  }
}

// SHA-512 hash generator from key-value pair
function generateCertificateHash(keys, values) {
  const serialized = JSON.stringify({ keys, values });
  return crypto.createHash("sha512").update(serialized).digest("hex");
}

// Test function
async function testCertificates() {
  const keys = ["Student Name", "Degree", "GPA", "IDate", "phy"];
  const values = ["Alice Smith", "B.Tech CSE", "9.51", "2025-05-10", "3.3"];

  const certHash = generateCertificateHash(keys, values);
  console.log("\n🔐 SHA-512 certHash:", certHash);

  console.log("\n--- 📝 Adding Certificate ---");
  await addCertificate(certHash, keys, values);

  console.log("\n--- ✅ Verifying Certificate ---");
  await verifyCertificate(certHash);
}

testCertificates();
