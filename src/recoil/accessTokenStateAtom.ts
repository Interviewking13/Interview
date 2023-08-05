import { atom } from 'recoil';

export const accessTokenStateAtom = atom({
    key: 'accessTokenState',
    default: localStorage.getItem('token') || '',
});
