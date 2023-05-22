const getToken = () => localStorage.getItem('token')
export const setToken = (userToken) => {localStorage.setItem('token', userToken)}
export const removeToken = () => {localStorage.removeItem("token")}

export default getToken;
