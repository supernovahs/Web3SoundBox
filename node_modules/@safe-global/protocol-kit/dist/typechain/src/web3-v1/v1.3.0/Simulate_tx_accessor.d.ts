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
export interface Simulate_tx_accessor extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): Simulate_tx_accessor;
    clone(): Simulate_tx_accessor;
    methods: {
        simulate(to: string, value: number | string | BN, data: string | number[], operation: number | string | BN): NonPayableTransactionObject<{
            estimate: string;
            success: boolean;
            returnData: string;
            0: string;
            1: boolean;
            2: string;
        }>;
    };
    events: {
        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
}
