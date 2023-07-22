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
    singleton: string;
    0: string;
    1: string;
}>;
export interface Proxy_factory extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): Proxy_factory;
    clone(): Proxy_factory;
    methods: {
        calculateCreateProxyWithNonceAddress(_singleton: string, initializer: string | number[], saltNonce: number | string | BN): NonPayableTransactionObject<string>;
        createProxy(singleton: string, data: string | number[]): NonPayableTransactionObject<string>;
        createProxyWithCallback(_singleton: string, initializer: string | number[], saltNonce: number | string | BN, callback: string): NonPayableTransactionObject<string>;
        createProxyWithNonce(_singleton: string, initializer: string | number[], saltNonce: number | string | BN): NonPayableTransactionObject<string>;
        proxyCreationCode(): NonPayableTransactionObject<string>;
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
