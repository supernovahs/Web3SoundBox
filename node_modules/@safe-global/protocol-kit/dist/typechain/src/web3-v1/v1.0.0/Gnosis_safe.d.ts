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
export type ExecutionFailed = ContractEventLog<{
    txHash: string;
    0: string;
}>;
export type AddedOwner = ContractEventLog<{
    owner: string;
    0: string;
}>;
export type RemovedOwner = ContractEventLog<{
    owner: string;
    0: string;
}>;
export type ChangedThreshold = ContractEventLog<{
    threshold: string;
    0: string;
}>;
export type EnabledModule = ContractEventLog<{
    module: string;
    0: string;
}>;
export type DisabledModule = ContractEventLog<{
    module: string;
    0: string;
}>;
export type ContractCreation = ContractEventLog<{
    newContract: string;
    0: string;
}>;
export interface Gnosis_safe extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): Gnosis_safe;
    clone(): Gnosis_safe;
    methods: {
        addOwnerWithThreshold(owner: string, _threshold: number | string | BN): NonPayableTransactionObject<void>;
        DOMAIN_SEPARATOR_TYPEHASH(): NonPayableTransactionObject<string>;
        isOwner(owner: string): NonPayableTransactionObject<boolean>;
        execTransactionFromModule(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN): NonPayableTransactionObject<boolean>;
        signedMessages(arg0: string | number[]): NonPayableTransactionObject<string>;
        enableModule(module: string): NonPayableTransactionObject<void>;
        changeThreshold(_threshold: number | string | BN): NonPayableTransactionObject<void>;
        approvedHashes(arg0: string, arg1: string | number[]): NonPayableTransactionObject<string>;
        changeMasterCopy(_masterCopy: string): NonPayableTransactionObject<void>;
        SENTINEL_MODULES(): NonPayableTransactionObject<string>;
        SENTINEL_OWNERS(): NonPayableTransactionObject<string>;
        getOwners(): NonPayableTransactionObject<string[]>;
        NAME(): NonPayableTransactionObject<string>;
        nonce(): NonPayableTransactionObject<string>;
        getModules(): NonPayableTransactionObject<string[]>;
        SAFE_MSG_TYPEHASH(): NonPayableTransactionObject<string>;
        SAFE_TX_TYPEHASH(): NonPayableTransactionObject<string>;
        disableModule(prevModule: string, module: string): NonPayableTransactionObject<void>;
        swapOwner(prevOwner: string, oldOwner: string, newOwner: string): NonPayableTransactionObject<void>;
        getThreshold(): NonPayableTransactionObject<string>;
        domainSeparator(): NonPayableTransactionObject<string>;
        removeOwner(prevOwner: string, owner: string, _threshold: number | string | BN): NonPayableTransactionObject<void>;
        VERSION(): NonPayableTransactionObject<string>;
        setup(_owners: string[], _threshold: number | string | BN, to: string, data: string | number[], paymentToken: string, payment: number | string | BN, paymentReceiver: string): NonPayableTransactionObject<void>;
        execTransaction(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN, safeTxGas: number | string | BN, baseGas: number | string | BN, gasPrice: number | string | BN, gasToken: string, refundReceiver: string, signatures: string | number[]): NonPayableTransactionObject<boolean>;
        requiredTxGas(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN): NonPayableTransactionObject<string>;
        approveHash(hashToApprove: string | number[]): NonPayableTransactionObject<void>;
        signMessage(_data: string | number[]): NonPayableTransactionObject<void>;
        isValidSignature(_data: string | number[], _signature: string | number[]): NonPayableTransactionObject<string>;
        getMessageHash(message: string | number[]): NonPayableTransactionObject<string>;
        encodeTransactionData(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN, safeTxGas: number | string | BN, baseGas: number | string | BN, gasPrice: number | string | BN, gasToken: string, refundReceiver: string, _nonce: number | string | BN): NonPayableTransactionObject<string>;
        getTransactionHash(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN, safeTxGas: number | string | BN, baseGas: number | string | BN, gasPrice: number | string | BN, gasToken: string, refundReceiver: string, _nonce: number | string | BN): NonPayableTransactionObject<string>;
    };
    events: {
        ExecutionFailed(cb?: Callback<ExecutionFailed>): EventEmitter;
        ExecutionFailed(options?: EventOptions, cb?: Callback<ExecutionFailed>): EventEmitter;
        AddedOwner(cb?: Callback<AddedOwner>): EventEmitter;
        AddedOwner(options?: EventOptions, cb?: Callback<AddedOwner>): EventEmitter;
        RemovedOwner(cb?: Callback<RemovedOwner>): EventEmitter;
        RemovedOwner(options?: EventOptions, cb?: Callback<RemovedOwner>): EventEmitter;
        ChangedThreshold(cb?: Callback<ChangedThreshold>): EventEmitter;
        ChangedThreshold(options?: EventOptions, cb?: Callback<ChangedThreshold>): EventEmitter;
        EnabledModule(cb?: Callback<EnabledModule>): EventEmitter;
        EnabledModule(options?: EventOptions, cb?: Callback<EnabledModule>): EventEmitter;
        DisabledModule(cb?: Callback<DisabledModule>): EventEmitter;
        DisabledModule(options?: EventOptions, cb?: Callback<DisabledModule>): EventEmitter;
        ContractCreation(cb?: Callback<ContractCreation>): EventEmitter;
        ContractCreation(options?: EventOptions, cb?: Callback<ContractCreation>): EventEmitter;
        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
    once(event: "ExecutionFailed", cb: Callback<ExecutionFailed>): void;
    once(event: "ExecutionFailed", options: EventOptions, cb: Callback<ExecutionFailed>): void;
    once(event: "AddedOwner", cb: Callback<AddedOwner>): void;
    once(event: "AddedOwner", options: EventOptions, cb: Callback<AddedOwner>): void;
    once(event: "RemovedOwner", cb: Callback<RemovedOwner>): void;
    once(event: "RemovedOwner", options: EventOptions, cb: Callback<RemovedOwner>): void;
    once(event: "ChangedThreshold", cb: Callback<ChangedThreshold>): void;
    once(event: "ChangedThreshold", options: EventOptions, cb: Callback<ChangedThreshold>): void;
    once(event: "EnabledModule", cb: Callback<EnabledModule>): void;
    once(event: "EnabledModule", options: EventOptions, cb: Callback<EnabledModule>): void;
    once(event: "DisabledModule", cb: Callback<DisabledModule>): void;
    once(event: "DisabledModule", options: EventOptions, cb: Callback<DisabledModule>): void;
    once(event: "ContractCreation", cb: Callback<ContractCreation>): void;
    once(event: "ContractCreation", options: EventOptions, cb: Callback<ContractCreation>): void;
}
