import type PluginBaseClass from '../types';
declare const libraryExtend: <T extends PluginBaseClass>(Plugins: T | T[], notify?: boolean, Lib?: any) => void;
export default libraryExtend;
