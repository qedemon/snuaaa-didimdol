export function getToken() {
  const tokenString = (
    (key)=>{
      const reg = new RegExp(key + '=([^;]*)');
      const result = reg.exec(document.cookie);
      return result?result[1]:"";
    }
  )("token");
  if (tokenString) {
    return tokenString;
  } else {
    throw new Error("브라우저에서 토큰을 불러오는 도중 에러가 발생했습니다.");
  }
}

export function setToken(token) {
  document.cookie = `token=${token}; domain=${process.env.REACT_APP_COOKIE_PATH}; path=/;`;
}

export function deleteToken() {
  document.cookie = `token=; domain=${process.env.REACT_APP_COOKIE_PATH}; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
