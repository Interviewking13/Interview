export const isLogin = (): boolean => {
    if (localStorage.getItem('token') !== null) {
        return true;
    }
    return false;
};
