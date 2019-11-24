import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default function SplitButton(props) {
	const { modifyCart, dish } = props;

	return (
		<ButtonGroup variant="contained" color="primary" aria-label="split button">
			<Button color="primary" size="small" onClick={() => modifyCart(dish, 'REMOVE')}>
				<RemoveIcon />
			</Button>
			<Button>{dish.count}</Button>
			<Button color="primary" size="small" onClick={() => modifyCart(dish, 'ADD')}>
				<AddIcon />
			</Button>
		</ButtonGroup>
	);
}
