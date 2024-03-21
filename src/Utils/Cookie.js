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
  document.cookie = `token=${token}; Max-Age=${60*60*24*14}; domain=${process.env.REACT_APP_COOKIE_PATH}; path=/;`;
  document.cookie = `token=${token}; Max-Age=${60*60*24*14}; path=/;`;
}

export function deleteToken() {
  document.cookie = `token=; domain=${process.env.REACT_APP_COOKIE_PATH}; Max-Age=-1;`;
  document.cookie = `token=; Max-Age=-1;`;
}
