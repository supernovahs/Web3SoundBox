/// <reference types="node" />
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type { Callback, PayableTransactionObject, BlockType, BaseContract } from "./types";
export interface EventOptions {
    filter?: object;
    fromBlock?: BlockType;
    topics?: string[];
}
export interface Multi_send extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): Multi_send;
    clone(): Multi_send;
    methods: {
        multiSend(transactions: string | number[]): PayableTransactionObject<void>;
    };
    events: {
        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
}
