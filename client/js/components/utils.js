function getCookie(name) {
  const cookieStr = document.cookie;
  const nameLen = name.length;
  const nameStartIndex = cookieStr.indexOf(name+'=');
  if (nameStartIndex < 0) {
    return null;
  }
  const valueStartIndex = nameStartIndex + nameLen + 1;
  let valueEndIndex = cookieStr.indexOf(';', valueStartIndex);

  if( !valueStartIndex && name !== cookieStr.substring(0, nameLen)) {////当startIndex为0的时候说明该name是第一个cookie,那name必须就是cookieStr.substring(0, name.length)
    return null;
  }
  
  if (valueEndIndex === -1) { //说明它就是最后一个cookie，后面没有;
    valueEndIndex = cookieStr.length;
  }
  return decodeURIComponent(cookieStr.substring(valueStartIndex, valueEndIndex));
}

function deleteCookie (name, domain, path) {  
  var cval = getCookie (name);
  var expires = (new Date((new Date()).getTime() - 1)).toUTCString();
  document.cookie = encodeURIComponent(name) + '=;'+ cval +' expires='+ expires +';domain=' + (domain ? domain : location.hostname) + ';path=' + (path ? path : '/');
}
export {getCookie, deleteCookie};