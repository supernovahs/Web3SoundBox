"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DfnsWallet = void 0;
const Wallets_1 = require("@dfns/sdk/codegen/datamodel/Wallets");
const address_1 = require("@ethersproject/address");
const abstract_signer_1 = require("@ethersproject/abstract-signer");
const bytes_1 = require("@ethersproject/bytes");
const hash_1 = require("@ethersproject/hash");
const keccak256_1 = require("@ethersproject/keccak256");
const properties_1 = require("@ethersproject/properties");
const transactions_1 = require("@ethersproject/transactions");
const sleep = (interval = 0) => new Promise((resolve) => setTimeout(resolve, interval));
class DfnsWallet extends abstract_signer_1.Signer {
    constructor(options, provider) {
        var _a, _b;
        super();
        this.options = {
            ...options,
            maxRetries: (_a = options.maxRetries) !== null && _a !== void 0 ? _a : 3,
            retryInterval: (_b = options.retryInterval) !== null && _b !== void 0 ? _b : 1000,
        };
        (0, properties_1.defineReadOnly)(this, 'provider', provider || undefined);
    }
    connect(provider) {
        return new DfnsWallet(this.options, provider);
    }
    async getAddress() {
        if (!this.address) {
            const { walletId, dfnsClient } = this.options;
            const res = await dfnsClient.wallets.getWallet({ walletId });
            if (!res.address) {
                throw new Error(`wallet ${walletId} does not have an address`);
            }
            this.address = (0, address_1.getAddress)(res.address);
        }
        return this.address;
    }
    async waitForSignature(signatureId) {
        var _a;
        const { walletId, dfnsClient, retryInterval } = this.options;
        let maxRetries = this.options.maxRetries;
        while (maxRetries > 0) {
            await sleep(retryInterval);
            const res = await dfnsClient.wallets.getSignature({ walletId, signatureId });
            if (res.status === Wallets_1.SignatureStatus.Signed) {
                if (!((_a = res.signature) === null || _a === void 0 ? void 0 : _a.encoded))
                    break;
                return res.signature.encoded;
            }
            else if (res.status === Wallets_1.SignatureStatus.Failed) {
                break;
            }
            maxRetries -= 1;
        }
        throw new Error(`signature ${signatureId} not available`);
    }
    async signTransaction(transaction) {
        return (0, properties_1.resolveProperties)(transaction).then(async (tx) => {
            if (tx.from != null) {
                if ((0, address_1.getAddress)(tx.from) !== (await this.getAddress())) {
                    throw new Error('transaction from address mismatch');
                }
                delete tx.from;
            }
            const { walletId, dfnsClient } = this.options;
            const res = await dfnsClient.wallets.generateSignature({
                walletId,
                body: { kind: Wallets_1.SignatureKind.Hash, hash: (0, keccak256_1.keccak256)((0, transactions_1.serialize)(tx)) },
            });
            const signature = await this.waitForSignature(res.id);
            return (0, transactions_1.serialize)(tx, signature);
        });
    }
    async signMessage(message) {
        const { walletId, dfnsClient } = this.options;
        const res = await dfnsClient.wallets.generateSignature({
            walletId,
            body: { kind: Wallets_1.SignatureKind.Hash, hash: (0, hash_1.hashMessage)(message) },
        });
        return this.waitForSignature(res.id);
    }
    async _signTypedData(domain, types, value) {
        var _a, _b, _c;
        const { walletId, dfnsClient } = this.options;
        const res = await dfnsClient.wallets.generateSignature({
            walletId,
            body: {
                kind: Wallets_1.SignatureKind.Eip712,
                types,
                domain: {
                    name: (_a = domain.name) !== null && _a !== void 0 ? _a : undefined,
                    version: (_b = domain.version) !== null && _b !== void 0 ? _b : undefined,
                    chainId: domain.chainId ? Number(domain.chainId) : undefined,
                    verifyingContract: (_c = domain.verifyingContract) !== null && _c !== void 0 ? _c : undefined,
                    salt: domain.salt ? (0, bytes_1.hexlify)(domain.salt) : undefined,
                },
                message: value,
            },
        });
        return this.waitForSignature(res.id);
    }
}
exports.DfnsWallet = DfnsWallet;
