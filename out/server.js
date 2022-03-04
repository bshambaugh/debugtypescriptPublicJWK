"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common = require("./common_Signer_test");
var jwkToPem = require("jwk-to-pem");
var elliptic_1 = require("elliptic");
var secp256r1 = new elliptic_1.ec('p256');
var key = secp256r1.genKeyPair();
var pubPoint = key.getPublic();
var x = pubPoint.getX();
var y = pubPoint.getY();
var publicPointHex_x = x.toString('hex');
var publicPointHex_y = y.toString('hex');
var message = "hello";
console.log(message + " world!");
var pemPublic = jwkToPem(common.publicToJWK(publicPointHex_x, publicPointHex_y, 'EC', 'P-256'));
console.log(pemPublic);
//# sourceMappingURL=server.js.map