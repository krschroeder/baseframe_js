
const generateGUID = () => {
    const size = 8, buf = new Uint16Array(size);
    let retStr = '', i = 0;

    window.crypto.getRandomValues(buf);
    while (i < size) {
        let ret = buf[i++].toString(16);

        if (ret.length < 4) {
            ret = "0" + ret;
        }
        retStr += ret;
    }

    return retStr;
}

export default generateGUID;
