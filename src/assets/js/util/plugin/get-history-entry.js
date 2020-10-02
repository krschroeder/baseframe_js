import { getHashParam } from '../get-param';

const getHistoryEntry = (_, entry) => {
    const { useHashFilter } = _.params;
    const { hash } = window.location;

    let historyEntry = entry;

    if (useHashFilter) {
        const newHash = `#${useHashFilter}=${entry}`;
        const foundHash = `#${useHashFilter}=${getHashParam(useHashFilter)}`;
     
        historyEntry = hash !== "" ?
            (hash.match(foundHash) ?
                hash.replace(foundHash, newHash) :
                `${hash}&${newHash}`
            ) :
            newHash
        ;

    }
  
    if (historyEntry === "") historyEntry = "#";

    return historyEntry;
}

export default getHistoryEntry;