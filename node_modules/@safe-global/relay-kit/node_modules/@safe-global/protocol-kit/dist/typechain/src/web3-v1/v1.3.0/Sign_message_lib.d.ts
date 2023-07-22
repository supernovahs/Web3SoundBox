/// <reference types="node" />
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type { Callback, NonPayableTransactionObject, BlockType, ContractEventLog, BaseContract } from "./types";
export interface EventOptions {
    filter?: object;
    fromBlock?: BlockType;
    topics?: string[];
}
export type SignMsg = ContractEventLog<{
    msgHash: string;
    0: string;
}>;
export interface Sign_message_lib extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): Sign_message_lib;
    clone(): Sign_message_lib;
    methods: {
        getMessageHash(message: string | number[]): NonPayableTransactionObject<string>;
        signMessage(_data: string | number[]): NonPayableTransactionObject<void>;
    };
    events: {
        SignMsg(cb?: Callback<SignMsg>): EventEmitter;
        SignMsg(options?: EventOptions, cb?: Callback<SignMsg>): EventEmitter;
        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
    once(event: "SignMsg", cb: Callback<SignMsg>): void;
    once(event: "SignMsg", options: EventOptions, cb: Callback<SignMsg>): void;
}
