/// <reference types="node" />
import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type { Callback, PayableTransactionObject, NonPayableTransactionObject, BlockType, ContractEventLog, BaseContract } from "./types";
export interface EventOptions {
    filter?: object;
    fromBlock?: BlockType;
    topics?: string[];
}
export type AddedOwner = ContractEventLog<{
    owner: string;
    0: string;
}>;
export type ApproveHash = ContractEventLog<{
    approvedHash: string;
    owner: string;
    0: string;
    1: string;
}>;
export type ChangedMasterCopy = ContractEventLog<{
    masterCopy: string;
    0: string;
}>;
export type ChangedThreshold = ContractEventLog<{
    threshold: string;
    0: string;
}>;
export type DisabledModule = ContractEventLog<{
    module: string;
    0: string;
}>;
export type EnabledModule = ContractEventLog<{
    module: string;
    0: string;
}>;
export type ExecutionFailure = ContractEventLog<{
    txHash: string;
    payment: string;
    0: string;
    1: string;
}>;
export type ExecutionFromModuleFailure = ContractEventLog<{
    module: string;
    0: string;
}>;
export type ExecutionFromModuleSuccess = ContractEventLog<{
    module: string;
    0: string;
}>;
export type ExecutionSuccess = ContractEventLog<{
    txHash: string;
    payment: string;
    0: string;
    1: string;
}>;
export type RemovedOwner = ContractEventLog<{
    owner: string;
    0: string;
}>;
export type SignMsg = ContractEventLog<{
    msgHash: string;
    0: string;
}>;
export interface Gnosis_safe extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): Gnosis_safe;
    clone(): Gnosis_safe;
    methods: {
        NAME(): NonPayableTransactionObject<string>;
        VERSION(): NonPayableTransactionObject<string>;
        addOwnerWithThreshold(owner: string, _threshold: number | string | BN): NonPayableTransactionObject<void>;
        approvedHashes(arg0: string, arg1: string | number[]): NonPayableTransactionObject<string>;
        changeMasterCopy(_masterCopy: string): NonPayableTransactionObject<void>;
        changeThreshold(_threshold: number | string | BN): NonPayableTransactionObject<void>;
        disableModule(prevModule: string, module: string): NonPayableTransactionObject<void>;
        domainSeparator(): NonPayableTransactionObject<string>;
        enableModule(module: string): NonPayableTransactionObject<void>;
        execTransactionFromModule(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN): NonPayableTransactionObject<boolean>;
        execTransactionFromModuleReturnData(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN): NonPayableTransactionObject<{
            success: boolean;
            returnData: string;
            0: boolean;
            1: string;
        }>;
        getModules(): NonPayableTransactionObject<string[]>;
        getModulesPaginated(start: string, pageSize: number | string | BN): NonPayableTransactionObject<{
            array: string[];
            next: string;
            0: string[];
            1: string;
        }>;
        getOwners(): NonPayableTransactionObject<string[]>;
        getThreshold(): NonPayableTransactionObject<string>;
        isModuleEnabled(module: string): NonPayableTransactionObject<boolean>;
        isOwner(owner: string): NonPayableTransactionObject<boolean>;
        nonce(): NonPayableTransactionObject<string>;
        removeOwner(prevOwner: string, owner: string, _threshold: number | string | BN): NonPayableTransactionObject<void>;
        setFallbackHandler(handler: string): NonPayableTransactionObject<void>;
        signedMessages(arg0: string | number[]): NonPayableTransactionObject<string>;
        swapOwner(prevOwner: string, oldOwner: string, newOwner: string): NonPayableTransactionObject<void>;
        setup(_owners: string[], _threshold: number | string | BN, to: string, data: string | number[], fallbackHandler: string, paymentToken: string, payment: number | string | BN, paymentReceiver: string): NonPayableTransactionObject<void>;
        execTransaction(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN, safeTxGas: number | string | BN, baseGas: number | string | BN, gasPrice: number | string | BN, gasToken: string, refundReceiver: string, signatures: string | number[]): PayableTransactionObject<boolean>;
        requiredTxGas(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN): NonPayableTransactionObject<string>;
        approveHash(hashToApprove: string | number[]): NonPayableTransactionObject<void>;
        signMessage(_data: string | number[]): NonPayableTransactionObject<void>;
        isValidSignature(_data: string | number[], _signature: string | number[]): NonPayableTransactionObject<string>;
        getMessageHash(message: string | number[]): NonPayableTransactionObject<string>;
        encodeTransactionData(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN, safeTxGas: number | string | BN, baseGas: number | string | BN, gasPrice: number | string | BN, gasToken: string, refundReceiver: string, _nonce: number | string | BN): NonPayableTransactionObject<string>;
        getTransactionHash(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN, safeTxGas: number | string | BN, baseGas: number | string | BN, gasPrice: number | string | BN, gasToken: string, refundReceiver: string, _nonce: number | string | BN): NonPayableTransactionObject<string>;
    };
    events: {
        AddedOwner(cb?: Callback<AddedOwner>): EventEmitter;
        AddedOwner(options?: EventOptions, cb?: Callback<AddedOwner>): EventEmitter;
        ApproveHash(cb?: Callback<ApproveHash>): EventEmitter;
        ApproveHash(options?: EventOptions, cb?: Callback<ApproveHash>): EventEmitter;
        ChangedMasterCopy(cb?: Callback<ChangedMasterCopy>): EventEmitter;
        ChangedMasterCopy(options?: EventOptions, cb?: Callback<ChangedMasterCopy>): EventEmitter;
        ChangedThreshold(cb?: Callback<ChangedThreshold>): EventEmitter;
        ChangedThreshold(options?: EventOptions, cb?: Callback<ChangedThreshold>): EventEmitter;
        DisabledModule(cb?: Callback<DisabledModule>): EventEmitter;
        DisabledModule(options?: EventOptions, cb?: Callback<DisabledModule>): EventEmitter;
        EnabledModule(cb?: Callback<EnabledModule>): EventEmitter;
        EnabledModule(options?: EventOptions, cb?: Callback<EnabledModule>): EventEmitter;
        ExecutionFailure(cb?: Callback<ExecutionFailure>): EventEmitter;
        ExecutionFailure(options?: EventOptions, cb?: Callback<ExecutionFailure>): EventEmitter;
        ExecutionFromModuleFailure(cb?: Callback<ExecutionFromModuleFailure>): EventEmitter;
        ExecutionFromModuleFailure(options?: EventOptions, cb?: Callback<ExecutionFromModuleFailure>): EventEmitter;
        ExecutionFromModuleSuccess(cb?: Callback<ExecutionFromModuleSuccess>): EventEmitter;
        ExecutionFromModuleSuccess(options?: EventOptions, cb?: Callback<ExecutionFromModuleSuccess>): EventEmitter;
        ExecutionSuccess(cb?: Callback<ExecutionSuccess>): EventEmitter;
        ExecutionSuccess(options?: EventOptions, cb?: Callback<ExecutionSuccess>): EventEmitter;
        RemovedOwner(cb?: Callback<RemovedOwner>): EventEmitter;
        RemovedOwner(options?: EventOptions, cb?: Callback<RemovedOwner>): EventEmitter;
        SignMsg(cb?: Callback<SignMsg>): EventEmitter;
        SignMsg(options?: EventOptions, cb?: Callback<SignMsg>): EventEmitter;
        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
    once(event: "AddedOwner", cb: Callback<AddedOwner>): void;
    once(event: "AddedOwner", options: EventOptions, cb: Callback<AddedOwner>): void;
    once(event: "ApproveHash", cb: Callback<ApproveHash>): void;
    once(event: "ApproveHash", options: EventOptions, cb: Callback<ApproveHash>): void;
    once(event: "ChangedMasterCopy", cb: Callback<ChangedMasterCopy>): void;
    once(event: "ChangedMasterCopy", options: EventOptions, cb: Callback<ChangedMasterCopy>): void;
    once(event: "ChangedThreshold", cb: Callback<ChangedThreshold>): void;
    once(event: "ChangedThreshold", options: EventOptions, cb: Callback<ChangedThreshold>): void;
    once(event: "DisabledModule", cb: Callback<DisabledModule>): void;
    once(event: "DisabledModule", options: EventOptions, cb: Callback<DisabledModule>): void;
    once(event: "EnabledModule", cb: Callback<EnabledModule>): void;
    once(event: "EnabledModule", options: EventOptions, cb: Callback<EnabledModule>): void;
    once(event: "ExecutionFailure", cb: Callback<ExecutionFailure>): void;
    once(event: "ExecutionFailure", options: EventOptions, cb: Callback<ExecutionFailure>): void;
    once(event: "ExecutionFromModuleFailure", cb: Callback<ExecutionFromModuleFailure>): void;
    once(event: "ExecutionFromModuleFailure", options: EventOptions, cb: Callback<ExecutionFromModuleFailure>): void;
    once(event: "ExecutionFromModuleSuccess", cb: Callback<ExecutionFromModuleSuccess>): void;
    once(event: "ExecutionFromModuleSuccess", options: EventOptions, cb: Callback<ExecutionFromModuleSuccess>): void;
    once(event: "ExecutionSuccess", cb: Callback<ExecutionSuccess>): void;
    once(event: "ExecutionSuccess", options: EventOptions, cb: Callback<ExecutionSuccess>): void;
    once(event: "RemovedOwner", cb: Callback<RemovedOwner>): void;
    once(event: "RemovedOwner", options: EventOptions, cb: Callback<RemovedOwner>): void;
    once(event: "SignMsg", cb: Callback<SignMsg>): void;
    once(event: "SignMsg", options: EventOptions, cb: Callback<SignMsg>): void;
}
