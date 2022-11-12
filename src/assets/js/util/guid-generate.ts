const hasCrypto = (typeof(window.crypto) !== 'undefined' && typeof(window.crypto.getRandomValues) !== 'undefined');

const generateGUID = ()=> {
  // If we have a cryptographically secure PRNG, use that
  // https://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
  const buf = new Uint16Array(8);
  window.crypto.getRandomValues(buf);
  let S4 = function(num) {
    let ret = num.toString(16);
    while(ret.length < 4){
      ret = "0"+ret;
    }
    return ret;
  };
  return (S4(buf[0])+S4(buf[1])+"-"+S4(buf[2])+"-"+S4(buf[3])+"-"+S4(buf[4])+"-"+S4(buf[5])+S4(buf[6])+S4(buf[7]));
}

export default generateGUID;
