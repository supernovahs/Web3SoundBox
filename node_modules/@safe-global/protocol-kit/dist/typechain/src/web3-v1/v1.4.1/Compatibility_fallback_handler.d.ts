/// <reference types="node" />
import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type { Callback, NonPayableTransactionObject, BlockType, BaseContract } from "./types";
export interface EventOptions {
    filter?: object;
    fromBlock?: BlockType;
    topics?: string[];
}
export interface Compatibility_fallback_handler extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): Compatibility_fallback_handler;
    clone(): Compatibility_fallback_handler;
    methods: {
        encodeMessageDataForSafe(safe: string, message: string | number[]): NonPayableTransactionObject<string>;
        getMessageHash(message: string | number[]): NonPayableTransactionObject<string>;
        getMessageHashForSafe(safe: string, message: string | number[]): NonPayableTransactionObject<string>;
        getModules(): NonPayableTransactionObject<string[]>;
        "isValidSignature(bytes32,bytes)"(_dataHash: string | number[], _signature: string | number[]): NonPayableTransactionObject<string>;
        "isValidSignature(bytes,bytes)"(_data: string | number[], _signature: string | number[]): NonPayableTransactionObject<string>;
        onERC1155BatchReceived(arg0: string, arg1: string, arg2: (number | string | BN)[], arg3: (number | string | BN)[], arg4: string | number[]): NonPayableTransactionObject<string>;
        onERC1155Received(arg0: string, arg1: string, arg2: number | string | BN, arg3: number | string | BN, arg4: string | number[]): NonPayableTransactionObject<string>;
        onERC721Received(arg0: string, arg1: string, arg2: number | string | BN, arg3: string | number[]): NonPayableTransactionObject<string>;
        simulate(targetContract: string, calldataPayload: string | number[]): NonPayableTransactionObject<string>;
        supportsInterface(interfaceId: string | number[]): NonPayableTransactionObject<boolean>;
        tokensReceived(arg0: string, arg1: string, arg2: string, arg3: number | string | BN, arg4: string | number[], arg5: string | number[]): NonPayableTransactionObject<void>;
    };
    events: {
        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
}
