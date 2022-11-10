// import getHistoryEntry from "./get-history-entry";
import type { LocationHashTrackingHistory } from '../../../types/shared';
import {changeHashParam} from '../get-param';

const updateHistoryState = (_, val: string, remove: boolean= false, prevKeyOrVal: string) => {

    const { useLocationHash, historyType, useHashFilter } = _.params as LocationHashTrackingHistory;
 
    if (useLocationHash && useHashFilter) {
        const qsParams = changeHashParam(useHashFilter, val, remove, prevKeyOrVal);
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