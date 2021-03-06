import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
];
const buildControls = props => {
	return (
		<div className={classes.BuildControls}>
			<p>Current Price: {props.price.toFixed(2)}</p>
			{controls.map(ctrl => {
				return (
					<BuildControl
						key={ctrl.label}
						label={ctrl.label}
						type={ctrl.type}
						added={() => props.ingredientAdded(ctrl.type)}
						removed={() => props.ingredientRemoved(ctrl.type)}
						disabled={props.disabled[ctrl.type]}
					/>
				);
			})}
			<button
				className={classes.OrderButton}
				disabled={!props.purchaseable}
				onClick={props.ordered}
			>
				{props.isAuth ? 'ORDER NOW' : 'Sign Up to order'}
			</button>
		</div>
	);
};

export default buildControls;
