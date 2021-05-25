import React, { useReducer } from 'react';
import SubComponent from './components/SubComponent/SubComponent';
import classes from './App.styles.css';
import Loader from './components/Loader/Loader';
import { defaultState, reducer } from './store';
import { DispatchContext } from './constants';


interface IProps {
	elementsAmount?: number;
}

const App: React.FC<IProps> = ({ elementsAmount }) => {
	const generatedArray = Array.from(
		{ length: elementsAmount ?? 5 },
		() => null
	);
	const [{ awaitingRequests }, dispatch] = useReducer(reducer, defaultState);
	return (
		<div className={classes.container}>
			<div className={classes.subContainer}>
				<div className={classes.title}>
					{'Тестовое приложение'}
				</div>
				<Loader status={awaitingRequests.length ? 'processing' : 'waiting'}/>
			</div>
			<div className={classes.elementsContainer}>
				<DispatchContext.Provider value={dispatch}>
					{generatedArray.map((_, index) => (
						<SubComponent 
							key={`subComponent__${index}`}
							label={'Test' + (index + 1)}
							index={index}
						/>
					))}
				</DispatchContext.Provider>
			</div>
		</div>
	);
};


export default App;