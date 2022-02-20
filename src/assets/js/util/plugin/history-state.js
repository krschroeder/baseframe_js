// import getHistoryEntry from "./get-history-entry";
import {qsToObject, objectToQs} from '../get-param';

const historyState = (_, id) => {

    const { useLocationHash, useHistoryState, useHashFilter } = _.params;
    const { protocol, host, pathname } = window.location;

    const page = protocol + '//' + host + (pathname || '');

    const hashObj = qsToObject(location.hash || '#') || {};

    if (hashObj[useHashFilter]) {
        $.extend(hashObj,{ [useHashFilter] : id});

    }

    if (useLocationHash) {
        const objToStr = objectToQs(hashObj);

        if (useHistoryState === 'replace') {
            history.replaceState(null, null, page + objToStr);
        } else {
            history.pushState(null, null, objToStr);
        }
    }
}

export default historyState;