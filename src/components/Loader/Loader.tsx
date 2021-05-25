import React, { useState, useEffect, useRef } from 'react';
import classes from './Loader.styles.css';


interface IProps {
	status: 'waiting' | 'processing' | 'success' | 'fail'
}
const Loader: React.FC<IProps> = ({ status }) => {
	const [animationClass, setAnimationClass] = useState(classes.fading);
	const [statusClass, setStatusClass] = useState(classes[status]);
	const [isAnimationProcessed, setIsAnimationProcessed] = useState(false);
	const setNextAnimationClass = () => {
		if (!['success', 'fail'].includes(status) || isAnimationProcessed) {
			return;
		}
		const newAnimationClass = animationClass === '' ? classes.fading : '';
		if (newAnimationClass !== classes.fading) {
			setStatusClass(classes[status]);
			setIsAnimationProcessed(true);
		} 
		setAnimationClass(newAnimationClass);
	};
	useEffect(() => {
		if (['processing', 'waiting'].includes(status)) {
			setStatusClass(classes[status]);
			setAnimationClass(status === 'waiting' ? classes.fading : '');
			setIsAnimationProcessed(false);
		} else {
			setNextAnimationClass();
		}
	}, [status])
	return (
		<div 
			className={`${classes.loaderGeneral} ${statusClass} ${animationClass}`}
			onTransitionEnd={setNextAnimationClass}
		/>
	);
};


export default Loader;
export type { 
	IProps as ILoaderProps
};
