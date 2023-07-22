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
export type ProxyCreation = ContractEventLog<{
    proxy: string;
    0: string;
}>;
export interface Proxy_factory extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): Proxy_factory;
    clone(): Proxy_factory;
    methods: {
        createProxyWithNonce(_mastercopy: string, initializer: string | number[], saltNonce: number | string | BN): NonPayableTransactionObject<string>;
        proxyCreationCode(): NonPayableTransactionObject<string>;
        createProxy(masterCopy: string, data: string | number[]): NonPayableTransactionObject<string>;
        proxyRuntimeCode(): NonPayableTransactionObject<string>;
    };
    events: {
        ProxyCreation(cb?: Callback<ProxyCreation>): EventEmitter;
        ProxyCreation(options?: EventOptions, cb?: Callback<ProxyCreation>): EventEmitter;
        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
    };
    once(event: "ProxyCreation", cb: Callback<ProxyCreation>): void;
    once(event: "ProxyCreation", options: EventOptions, cb: Callback<ProxyCreation>): void;
}
