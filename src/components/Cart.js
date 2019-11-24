import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { updateCart } from '../store/actions/cart';
import SplitButtons from './SplitButtons';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(10),
		overflow: 'hidden'
	},
	empty: {
		margin: theme.spacing(3),
		textAlign: 'center'
	}
}));

function Cart(props) {
	const classes = useStyles();
	const { cart, updateCart } = props;
	let total = 0;
	if (cart && cart.length !== 0) {
		cart.forEach((item) => {
			total += item.price * item.count;
		});
	}
	const modifyCart = (dish, type) => {
		let newCart = cart;
		newCart.forEach((cart, index) => {
			if (cart.itemname === dish.itemname) {
				if (type === 'ADD') cart.count += 1;
				else if (type === 'REMOVE') cart.count -= 1;
				if (cart.count === 0) {
					newCart.splice(index, 1);
				}
			}
		});
		updateCart(newCart);
	};

	return (
		<Paper className={classes.root}>
			{cart.length !== 0 ? (
				<Table aria-label="spanning table">
					<TableHead>
						<TableRow>
							<TableCell>Item</TableCell>
							<TableCell>Qty.</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Sum</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cart.map((item, index) => {
							return (
								<TableRow key={index}>
									<TableCell>{item.itemname.toUpperCase()}</TableCell>
									<TableCell>
										<SplitButtons modifyCart={modifyCart} dish={item} />
									</TableCell>
									<TableCell>₹{item.price}</TableCell>
									<TableCell>₹{item.price * item.count}</TableCell>
								</TableRow>
							);
						})}
						<TableRow>
							<TableCell colSpan={3}>
								<b>Total</b>
							</TableCell>
							<TableCell>
								<b>₹{total}</b>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			) : (
				<Typography className={classes.empty}>Cart is Empty.</Typography>
			)}
		</Paper>
	);
}

const mapStateToProps = (state) => {
	return { cart: state.cart };
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateCart: (cart) => dispatch(updateCart(cart))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
