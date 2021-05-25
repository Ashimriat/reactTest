import { createContext } from 'react';


export enum AppActions {
	ADD_TO_AWAIT_LIST = 'ADD_TO_AWAIT_LIST',
	REMOVE_FROM_AWAIT_LIST = 'REMOVE_FROM_AWAIT_LIST'
};
export const DispatchContext = createContext(null as any);
