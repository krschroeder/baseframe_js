// import getHistoryEntry from "./get-history-entry";
import {changeHashParam} from '../get-param';

const updateHistoryState = (_, val, remove = false, prevVal) => {

    const { useLocationHash, historyType, useHashFilter } = _.params;
 
    if (useLocationHash) {
        const updatedQs = '#' + changeHashParam(useHashFilter, val, remove, prevVal);  

        if (historyType === 'replace') {
            history.replaceState(null, null, updatedQs);

        } else if (historyType === 'push') {
            history.pushState(null, null, updatedQs);

        } else {
            console.warn(`Please specifiy either 'push' or 'replace' for the state`);
        }
    }
}

export default updateHistoryState;