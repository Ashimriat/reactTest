import { AppActions } from './constants';
import type { Reducer } from 'react';


interface IState {
	awaitingRequests: number[];
}
interface IAction {
	type: keyof typeof AppActions;
	payload: number;
}

export const defaultState: IState = {
	awaitingRequests: [],
}
export const reducer: Reducer<IState, IAction> = (prevState, action) => {
	switch (action.type) {
		case AppActions.ADD_TO_AWAIT_LIST:
			return {
				awaitingRequests: [...prevState.awaitingRequests, action.payload],
			};
		case AppActions.REMOVE_FROM_AWAIT_LIST:	
			return {
				awaitingRequests: prevState.awaitingRequests.filter(val => val !== action.payload),
			}
		default:
			return prevState;
	}
}