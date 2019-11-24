import React from 'react';
import { Grid, Card, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import _ from 'lodash';
import { makeStyles } from '@material-ui/styles';
import { sortTypes } from '../constants/constants';
import { connect } from 'react-redux';
import { updateCart } from '../store/actions/cart';

const useStyles = makeStyles((theme) => ({
	dishesLayout: {
		margin: theme.spacing(5, 2, 2, 2)
	},
	dishLayout: {
		padding: theme.spacing(2)
	},
	button: {
		margin: theme.spacing(10, 1, 1, 1)
	},
	addCartLayout: {
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'space-between'
	}
}));
function Dishes(props) {
	const classes = useStyles();
	const [ dishes, setDishes ] = React.useState([]);
	const [ loading, setLoading ] = React.useState(true);
	const { sort, cart, search, updateCart } = props;
	const addToCart = (dish) => {
		let isItemAlreadyAdded = false;
		let newCart = cart;
		newCart.forEach((item) => {
			if (item.itemname === dish.itemname) {
				if (Object.keys(item).includes('count')) {
					item['count'] += 1;
					isItemAlreadyAdded = true;
				}
			}
		});
		if (isItemAlreadyAdded) {
			updateCart(newCart);
		} else {
			dish['count'] = 1;
			newCart.push(dish);
			updateCart(newCart);
		}
		updateCart(newCart);
	};
	React.useEffect(
		() => {
			axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/smartQFood8bef5a2.json').then((res) => {
				let { data } = res;
				if (search !== '') {
					let dishes = data;
					data = [];
					dishes.forEach((dish) => {
						if (dish.itemname.includes(search)) {
							data.push(dish);
						}
					});
				}
				if (sort === sortTypes[1]) {
					setDishes(_.orderBy(data, [ 'price' ], [ 'asc' ]));
				} else if (sort === sortTypes[0]) {
					setDishes(_.orderBy(data, [ 'price' ], [ 'desc' ]));
				} else setDishes(data);
				setLoading(false);
			});
		},
		[ loading, sort, search ]
	);

	return (
		<div className={classes.dishesLayout}>
			{!loading ? (
				<Grid container spacing={3}>
					{dishes !== [] ? (
						dishes.map((dish, index) => {
							return (
								<Grid item xs={4} key={index}>
									<Card className={classes.dishLayout}>
										<Typography variant="h5"> {dish.itemname.toUpperCase()} </Typography>
										<Typography>
											<b> Time: {dish.availabletime} </b>
										</Typography>
										<div className={classes.addCartLayout}>
											<Typography variant="h6"> ₹{dish.price} </Typography>
											<Button
												variant="contained"
												className={classes.button}
												onClick={(event) => addToCart(dish)}
											>
												<Typography> Add to cart </Typography>
											</Button>
										</div>
									</Card>
								</Grid>
							);
						})
					) : null}
				</Grid>
			) : null}
		</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dishes);
