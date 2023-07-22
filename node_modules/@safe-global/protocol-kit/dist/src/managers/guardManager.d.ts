import { EthAdapter, SafeContract } from '@safe-global/safe-core-sdk-types';
declare class GuardManager {
    #private;
    constructor(ethAdapter: EthAdapter, safeContract?: SafeContract);
    private validateGuardAddress;
    private validateGuardIsNotEnabled;
    private validateGuardIsEnabled;
    getGuard(): Promise<string>;
    encodeEnableGuardData(guardAddress: string): Promise<string>;
    encodeDisableGuardData(): Promise<string>;
}
export default GuardManager;
