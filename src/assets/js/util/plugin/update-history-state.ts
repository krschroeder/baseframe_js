// import getHistoryEntry from "./get-history-entry";
import type { LocationHashTrackingHistory } from '../../types/shared';
import updateSearchParams from '../update-search-params';

const updateHistoryState = (params:LocationHashTrackingHistory, val: string, remove: boolean = false, prevVal?: string) => {

    const { useLocationHash, historyType, useHashFilter } = params;
    const paramKey = useHashFilter || val;
    const value = remove ? null : (useHashFilter ? val : null);

    if (useLocationHash) {
        const qsParams = updateSearchParams('hash',paramKey, value, remove, prevVal);
        const updatedQs = qsParams ? '#' + qsParams : ' ';//space allows a change if there are no params
      
        if (!historyType || historyType === 'replace') {
            // if we don't have this parameter then
            // we just replace the state
            history.replaceState(null, '', updatedQs);

        } else if (historyType === 'push') {  
            history.pushState(null, '', updatedQs);

        } else {
            console.warn(`Please specifiy either 'push' or 'replace' for the state`);
        }
    }
}

export default updateHistoryState;