import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { MultiSendCallOnly, MultiSendCallOnlyInterface } from "../../libraries/MultiSendCallOnly";
type MultiSendCallOnlyConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class MultiSendCallOnly__factory extends ContractFactory {
    constructor(...args: MultiSendCallOnlyConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<MultiSendCallOnly>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): MultiSendCallOnly;
    connect(signer: Signer): MultiSendCallOnly__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061019a806100206000396000f3fe60806040526004361061001e5760003560e01c80638d80ff0a14610023575b600080fd5b6100dc6004803603602081101561003957600080fd5b810190808035906020019064010000000081111561005657600080fd5b82018360208201111561006857600080fd5b8035906020019184600183028401116401000000008311171561008a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506100de565b005b805160205b8181101561015f578083015160f81c6001820184015160601c60158301850151603584018601516055850187016000856000811461012857600181146101385761013d565b6000808585888a5af1915061013d565b600080fd5b50600081141561014c57600080fd5b82605501870196505050505050506100e3565b50505056fea264697066735822122035246402746c96964495cae5b36461fd44dfb89f8e6cf6f6b8d60c0aa89f414864736f6c63430007060033";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "transactions";
            readonly type: "bytes";
        }];
        readonly name: "multiSend";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }];
    static createInterface(): MultiSendCallOnlyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MultiSendCallOnly;
}
export {};
