import { atom } from 'recoil';

export const EditContentAtom = atom({
    key: 'EditContent',
    default: { title: '난나나나', content: '솨아아' },
});
