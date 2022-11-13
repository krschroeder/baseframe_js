import $ from 'cash-dom';
import getType from "./helpers";
 
const updateObjectProps = (
    updateObj: object,
    key: string,
    val?: string,
    removeIfNullVal: boolean = true,
): void => {
    const isNull = getType(val) === 'null';
    // main operation of updating or removing
    if (isNull && removeIfNullVal) {
 
       if (({}).hasOwnProperty.call(updateObj, key)) {
          delete updateObj[key];
       }
 
    } else {
       $.extend(updateObj, { [key]: val ? val : '' });
    }
}

export default updateObjectProps;