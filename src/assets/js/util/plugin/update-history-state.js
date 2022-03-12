// import getHistoryEntry from "./get-history-entry";
import {changeHashParam} from '../get-param';

const updateHistoryState = (_, val) => {

    const { useLocationHash, historyType, useHashFilter } = _.params;
 
    if (useLocationHash) {
        const updatedQs = '#' + (useHashFilter ? changeHashParam(useHashFilter, val) : val);
        
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