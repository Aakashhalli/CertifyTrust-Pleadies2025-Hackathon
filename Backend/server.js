const express = require("express");
const cors = require("cors");
const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Setup Web3 with Ganache RPC
const web3 = new Web3("http://127.0.0.1:7545");

// Ganache account and private key
const publicKey = "0xC08eaFa08d033c00516e00818B50C628CF97Df86";
const privateKey =
  "0xa5771901ab0c2573b075ad3a329caaae3e16e9567c2b0ad6d6a3b66592042ce9";

// Load contract ABI and address
const contractJson = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      "../Blockchain/truffle/build/contracts/CertificateRegistry.json"
    ),
    "utf8"
  )
);

const abi = contractJson.abi;
const networkId = Object.keys(contractJson.networks)[0];
const contractAddress = contractJson.networks[networkId].address;
const certificateContract = new web3.eth.Contract(abi, contractAddress);

// In-memory mapping: certificateId -> certHash
const certificateMap = {};

// Generate SHA-512 hash from key-value data
function generateCertificateHash(keys, values) {
  const serialized = JSON.stringify({ keys, values });
  return crypto.createHash("sha512").update(serialized).digest("hex");
}

// Generate unique certificateId like CERT_ABC123
function generateCertificateId() {
  const uniqueCode = crypto.randomBytes(3).toString("hex").toUpperCase(); // 6 hex digits
  return `CERT_${uniqueCode}`;
}

// Add to blockchain
async function addCertificate(certHash, keys, values) {
  const tx = certificateContract.methods.addCertificate(certHash, keys, values);
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
      chainId: 1337,
    },
    privateKey
  );

  return await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}

// POST: Add certificate and generate ID
app.post("/add-certificate", async (req, res) => {
  try {
    let { keys, values } = req.body;

    if (
      !Array.isArray(keys) ||
      !Array.isArray(values) ||
      keys.length !== values.length
    ) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Keys and values must be equal-length arrays",
        });
    }

    // Convert all values to strings (handle null/undefined too)
    values = values.map((v) =>
      v !== null && v !== undefined ? String(v) : ""
    );

    const certHash = generateCertificateHash(keys, values);
    const certificateId = generateCertificateId();

    await addCertificate(certHash, keys, values);
    certificateMap[certificateId] = certHash;

    res.json({ success: true, certificateId });
    console.log("\n📌 Current Certificate Map:", certificateMap);
  } catch (err) {
    console.error("❌ Error in /add-certificate:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET: Verify by certificateId
app.get("/verify-certificate/:certificateId", async (req, res) => {
  try {
    const certificateId = req.params.certificateId;
    console.log(
      `[INFO] Received verification request for Certificate ID: ${certificateId}`
    );

    const certHash = certificateMap[certificateId];
    if (!certHash) {
      console.warn(`[WARN] Certificate ID not found: ${certificateId}`);
      return res
        .status(404)
        .json({ success: false, error: "Certificate ID not found" });
    }

    console.log(`[INFO] Found certHash: ${certHash}`);

    const result = await certificateContract.methods
      .verifyCertificate(certHash)
      .call();
    const keys = result[0];
    const values = result[1];

    console.log(`[INFO] Blockchain response keys:`, keys);
    console.log(`[INFO] Blockchain response values:`, values);

    const data = keys.map((key, i) => ({ [key]: values[i] }));

    console.log(`[INFO] Final parsed certificate data:`, data);

    res.json({ success: true, certificateId, data });
  } catch (err) {
    console.error(`[ERROR] Verification failed:`, err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// // GET: Verify by certificateId
// app.get('/verify-certificate/:certificateId', async (req, res) => {
//   try {
//     const certificateId = req.params.certificateId;
//     console.log(`[INFO] Received verification request for Certificate ID: ${certificateId}`);

//     // Mock data, no actual logic
//     const mockData = {
//       success: true,
//       certificateId,
//       data: [
//         { "Recipient": "swapnils" },
//         { "Degree": "Bachelor of Computer Science" },
//         { "Institution": "KLE Technological University" },
//         { "Graduation Date": "2023-05-15" },
//         { "Blockchain ID": "0x1234abcd" },
//         { "Timestamp": "2023-05-15T10:00:00Z" },
//         { "Certificate ID": certificateId },
//       ]
//     };

//     console.log(`[INFO] Sending mock response for certificateId: ${certificateId}`);

//     // Send mock data as response
//     res.json(mockData);
//   } catch (err) {
//     console.error(`[ERROR] Verification failed:`, err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
