import * as common from  "./common_Signer_test";
import * as jwkToPem from 'jwk-to-pem';
import { ec as EC } from 'elliptic';

const secp256r1 = new EC('p256');
var key = secp256r1.genKeyPair();
var pubPoint = key.getPublic();
var x = pubPoint.getX();
var y = pubPoint.getY();
const publicPointHex_x = x.toString('hex');
const publicPointHex_y = y.toString('hex');

let message: string = "hello";
console.log(message+ " world!");


const pemPublic = jwkToPem(common.publicToJWK(publicPointHex_x,publicPointHex_y,'EC','P-256'));

console.log(pemPublic);

