// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {

    struct Certificate {
        string[] keys;
        string[] values;
    }

    mapping(string => Certificate) private certificates;

    event CertificateIssued(string certHash);

    // Add a certificate with dynamic key-value attributes
    function addCertificate(
        string memory _certHash,
        string[] memory _keys,
        string[] memory _values
    ) public {
        require(certificates[_certHash].keys.length == 0, "Certificate already exists");
        require(_keys.length == _values.length, "Mismatched key-value lengths");

        certificates[_certHash] = Certificate({
            keys: _keys,
            values: _values
        });

        emit CertificateIssued(_certHash);
    }

    // Retrieve the key-value pairs for a certificate
    function verifyCertificate(string memory _certHash) public view returns (
        string[] memory keys,
        string[] memory values
    ) {
        Certificate memory cert = certificates[_certHash];
        return (
            cert.keys,
            cert.values
        );
    }
}
