import { EthAdapter, SafeContract } from '@safe-global/safe-core-sdk-types';
declare class ModuleManager {
    #private;
    constructor(ethAdapter: EthAdapter, safeContract?: SafeContract);
    private validateModuleAddress;
    private validateModuleIsNotEnabled;
    private validateModuleIsEnabled;
    getModules(): Promise<string[]>;
    isModuleEnabled(moduleAddress: string): Promise<boolean>;
    encodeEnableModuleData(moduleAddress: string): Promise<string>;
    encodeDisableModuleData(moduleAddress: string): Promise<string>;
}
export default ModuleManager;
