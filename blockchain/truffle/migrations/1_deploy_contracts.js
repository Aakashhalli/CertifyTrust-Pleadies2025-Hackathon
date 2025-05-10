const Certificate = artifacts.require("CertificateRegistry");

module.exports = function (deployer) {
  deployer.deploy(Certificate);
};
