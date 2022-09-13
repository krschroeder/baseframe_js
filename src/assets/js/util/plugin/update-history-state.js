// import getHistoryEntry from "./get-history-entry";
import {changeHashParam} from '../get-param';

const updateHistoryState = (_, val, remove = false, prevVal) => {

    const { useLocationHash, historyType, useHashFilter } = _.params;
 
    if (useLocationHash) {
        const qsParams = changeHashParam(useHashFilter, val, remove, prevVal);
        const updatedQs = qsParams ? '#' + qsParams : ' ';//space allows a change if there are no params

        if (!historyType || historyType === 'replace') {
            // if we don't have this parameter then
            // we just replace the state
            history.replaceState(null, null, updatedQs);

        } else if (historyType === 'push') {  
            history.pushState(null, null, updatedQs);

        } else {
            console.warn(`Please specifiy either 'push' or 'replace' for the state`);
        }
    }
}

export default updateHistoryState;