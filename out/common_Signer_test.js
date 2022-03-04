"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateToJWK = exports.publicToJWK = exports.verifyTokenFormAndValidity = exports.CreateauddidDoc = exports.CreatedidDoc = exports.CreatedidDocLegacy = exports.did = exports.address = exports.aud = void 0;
var jwt = require("jsonwebtoken");
var u8a = require("uint8arrays");
var audAddress = '0x20c769ec9c0996ba7737a4826c2aaff00b1b2040';
exports.aud = "did:ethr:".concat(audAddress);
exports.address = '0xf3beac30c498d9e26865f34fcaa57dbb935b0d74';
exports.did = "did:ethr:".concat(exports.address);
function CreatedidDocLegacy(did, publicKey, keyTypeVer, keyTypeAuth) {
    var _a;
    return _a = {}, _a['@context'] = 'https://w3id.org/did/v1', _a.id = did, _a.publicKey = [
        {
            id: "".concat(did, "#keys-1"),
            type: keyTypeVer,
            owner: did,
            publicKeyHex: publicKey
        }
    ], _a.authentication = [
        {
            type: keyTypeAuth,
            publicKey: "".concat(did, "#keys-1")
        }
    ], _a;
}
exports.CreatedidDocLegacy = CreatedidDocLegacy;
function CreatedidDoc(did, publicKey, keyTypeVer) {
    var _a;
    return { didDocument: (_a = {},
            _a['@context'] = 'https://w3id.org/did/v1',
            _a.id = did,
            _a.verificationMethod = [
                {
                    id: "".concat(did, "#keys-1"),
                    type: keyTypeVer,
                    controller: did,
                    publicKeyHex: publicKey,
                }
            ],
            _a.authentication = ["".concat(did, "#keys-1")],
            _a.assertionMethod = ["".concat(did, "#keys-1")],
            _a.capabilityInvocation = ["".concat(did, "#keys-1")],
            _a.capabilityDelegation = ["".concat(did, "#some-key-that-does-not-exist")],
            _a)
    };
}
exports.CreatedidDoc = CreatedidDoc;
function CreateauddidDoc(did, aud, publicKey, keyTypeVer) {
    var _a;
    return { didDocument: (_a = {},
            _a['@context'] = 'https://w3id.org/did/v1',
            _a.id = aud,
            _a.verificationMethod = [
                {
                    id: "".concat(aud, "#keys-1"),
                    type: keyTypeVer,
                    controller: did,
                    publicKeyHex: publicKey,
                }
            ],
            _a.authentication = ["".concat(aud, "#keys-1")],
            _a.assertionMethod = ["".concat(aud, "#keys-1")],
            _a.capabilityInvocation = ["".concat(aud, "#keys-1")],
            _a.capabilityDelegation = ["".concat(aud, "#some-key-that-does-not-exist")],
            _a)
    };
}
exports.CreateauddidDoc = CreateauddidDoc;
// verify that the token is both a valid JWT and constains a signature that resolves with a public Key
function verifyTokenFormAndValidity(token, pemPublic) {
    var result;
    try {
        jwt.verify(token, pemPublic);
        result = true;
    }
    catch (e) {
        console.error(e.name + ': ' + e.message);
        result = false;
    }
    return result;
}
exports.verifyTokenFormAndValidity = verifyTokenFormAndValidity;
// input public key in hex, and export pem
function publicToJWK(publicPointHex_x, publicPointHex_y, kty_value, crv_value) {
    if (publicPointHex_x.length % 2 != 0) {
        publicPointHex_x = '0' + publicPointHex_x;
    }
    if (publicPointHex_y.length % 2 != 0) {
        publicPointHex_y = '0' + publicPointHex_y;
    }
    var publicPointUint8_x = u8a.fromString(publicPointHex_x, 'hex');
    var publicPointBase64URL_x = u8a.toString(publicPointUint8_x, 'base64url');
    var publicPointUint8_y = u8a.fromString(publicPointHex_y, 'hex');
    var publicPointBase64URL_y = u8a.toString(publicPointUint8_y, 'base64url');
    return {
        kty: kty_value,
        crv: crv_value,
        x: publicPointBase64URL_x,
        y: publicPointBase64URL_y
    };
}
exports.publicToJWK = publicToJWK;
// input private key in hex, and export pem
function privateToJWK(privatePointHex, kty_value, crv_value) {
    if (privatePointHex.length % 2 != 0) {
        '0' + privatePointHex;
    }
    var privatePointUint8 = u8a.fromString(privatePointHex, 'hex');
    var privatePointBase64URL = u8a.toString(privatePointUint8, 'base64url');
    return {
        kty: kty_value,
        crv: crv_value,
        d: privatePointBase64URL
    };
}
exports.privateToJWK = privateToJWK;
//# sourceMappingURL=common_Signer_test.js.map