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
export type ContractCreation = ContractEventLog<{
    newContract: string;
    0: string;
}>;
export interface Create_call extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): Create_call;
    clone(): Create_call;
    methods: {
        performCreate(value: number | string | BN, deploymentData: string | number[]): NonPayableTransactionObject<string>;
        performCreate2(value: number | string | BN, deploymentData: string | number[], salt: string | number[]): NonPayableTransactionObject<string>;
    };
    events: {
        ContractCreation(cb?: Callback<ContractCreation>): EventEmitter;
        ContractCreation(options?: EventOptions, cb?: Callback<ContractCreation>): EventEmitter;
        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
    once(event: "ContractCreation", cb: Callback<ContractCreation>): void;
    once(event: "ContractCreation", options: EventOptions, cb: Callback<ContractCreation>): void;
}
