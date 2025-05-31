import type { LocationTracking } from "../types";
import UrlState from "../core/UrlState";


const loadFromUrl = (p: LocationTracking, fn: (id: string) => void) => {
    if (
        p.locationFilter !== null && 
        p.loadLocation && 
        p.urlFilterType !== 'none'
    ) {
        const id = UrlState.get(p.urlFilterType, p.locationFilter) as string;
            
        if (id) fn(id);
    }
}

export default loadFromUrl;