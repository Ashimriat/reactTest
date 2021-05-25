import React, { useState, useContext } from 'react';
import type { ILoaderProps } from '../Loader/Loader';
import Loader from '../Loader/Loader';
import classes from './SubComponent.styles.css';
import { AppActions, DispatchContext } from '../../constants';


interface IProps {
	label: string;
	index: number;
}

const SubComponent: React.FC<IProps> = ({ label, index }) => {
	const dispatch = useContext(DispatchContext);
	const [loadingStatus, setLoadingStatus] = useState<ILoaderProps['status']>('waiting');
	const [inputValue, setInputValue] = useState('');
	const updateInput = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setLoadingStatus('waiting');
		setInputValue(e.target.value);
	}
	const emulateRequest = async () => {
		dispatch({ 
			type: AppActions.ADD_TO_AWAIT_LIST,
			payload: index
		});
		console.log(`Эмуляция запроса по адресу: [${inputValue}]`);
		const timeoutValue = Math.round(Math.random() * 5 + 5);
		console.log(`Сгенерированное время ожидания ответа: [${timeoutValue}] сек.`)
		const isSuccessfulResult = !!Math.round(Math.random());
		setLoadingStatus('processing');
		setTimeout(() => {
			setLoadingStatus(isSuccessfulResult ? 'success' : 'fail');
			dispatch({ 
				type: AppActions.REMOVE_FROM_AWAIT_LIST,
				payload: index
			});
		}, timeoutValue * 1000);
	};
	const generateButtonClasses = (): string => {
		let res = classes.button;
		if (loadingStatus === 'processing' || !inputValue.length) {
			res += ` ${classes.buttonDisabled}`;
		}
		return res;
	}

	return (
		<div className={classes.container}>
			<div className={classes.subContainer}>
				<div className={classes.label}>
					{label}
				</div>
				<Loader status={loadingStatus}/>
			</div>
			<input 
				className={classes.input}
				value={inputValue}
				onChange={updateInput}
			/>
			<button
				className={generateButtonClasses()}
				onClick={emulateRequest}
			>
				{'Отправить запрос'}
			</button>
		</div>
	);
}

export default SubComponent;
