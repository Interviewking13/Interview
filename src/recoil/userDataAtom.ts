import { atom } from 'recoil';

/** 리코일 유저정보 키, 원자값 key: 'userData',default: { user_name: '' },*/
export const userDataAtom = atom({
    key: 'userData',
    default: { user_name: '' },
});
