/// <reference types="node" />
import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type { Callback, NonPayableTransactionObject, BlockType, ContractEventLog, BaseContract } from "./types";
export interface EventOptions {
    filter?: object;
    fromBlock?: BlockType;
    topics?: string[];
}
export type GasUsage = ContractEventLog<{
    safe: string;
    txHash: string;
    nonce: string;
    success: boolean;
    0: string;
    1: string;
    2: string;
    3: boolean;
}>;
export type TransactionDetails = ContractEventLog<{
    safe: string;
    txHash: string;
    to: string;
    value: string;
    data: string;
    operation: string;
    safeTxGas: string;
    usesRefund: boolean;
    nonce: string;
    signatures: string;
    executor: string;
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: boolean;
    8: string;
    9: string;
    10: string;
}>;
export interface DebugTransactionGuard extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): DebugTransactionGuard;
    clone(): DebugTransactionGuard;
    methods: {
        checkAfterExecution(txHash: string | number[], success: boolean): NonPayableTransactionObject<void>;
        checkTransaction(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN, safeTxGas: number | string | BN, baseGas: number | string | BN, gasPrice: number | string | BN, gasToken: string, refundReceiver: string, signatures: string | number[], executor: string): NonPayableTransactionObject<void>;
        supportsInterface(interfaceId: string | number[]): NonPayableTransactionObject<boolean>;
        txNonces(arg0: string | number[]): NonPayableTransactionObject<string>;
    };
    events: {
        GasUsage(cb?: Callback<GasUsage>): EventEmitter;
        GasUsage(options?: EventOptions, cb?: Callback<GasUsage>): EventEmitter;
        TransactionDetails(cb?: Callback<TransactionDetails>): EventEmitter;
        TransactionDetails(options?: EventOptions, cb?: Callback<TransactionDetails>): EventEmitter;
        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
    once(event: "GasUsage", cb: Callback<GasUsage>): void;
    once(event: "GasUsage", options: EventOptions, cb: Callback<GasUsage>): void;
    once(event: "TransactionDetails", cb: Callback<TransactionDetails>): void;
    once(event: "TransactionDetails", options: EventOptions, cb: Callback<TransactionDetails>): void;
}
