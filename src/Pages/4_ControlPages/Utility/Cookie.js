export function getCookie(key) {
    const reg = new RegExp(key + '=([^;]*)');
    const result = reg.exec(document.cookie);
    return result?result[1]:"";
}
export function setCookie(key, value, expires=null){
    const cookieString = `${key}=${value}; domain=${process.env.REACT_APP_COOKIE_PATH}; path=/; ${expires?`expires=${expires};`:``}`;
    //const cookieStringLocal = `${key}=${value}; path=/; ${expires?`expires=${expires};`:``}`;
    document.cookie=cookieString;
    //document.cookie=cookieStringLocal;
}
