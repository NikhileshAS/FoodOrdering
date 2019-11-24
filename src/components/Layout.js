import React from 'react';
import { AppBar, Button } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Dishes from './Dishes';
import constants from '../constants/constants';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import Cart from './Cart';

const sortTypes = constants.sortTypes;

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	topLayout: {
		position: 'relative',
		float: 'right'
	},
	button: {
		margin: theme.spacing(2, 2, 1, 1),
		textDecoration: 'none',
		textDecorationColor: theme.palette.primary
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto'
		}
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200
			}
		}
	}
}));

const setSorting = (sort, setSort) => {
	if (sort === sortTypes[0]) setSort(sortTypes[1]);
	else if (sort === sortTypes[1]) setSort(sortTypes[0]);
	else setSort(sortTypes[1]);
};

export default function Layout(props) {
	const classes = useStyles();
	const [ sort, setSort ] = React.useState('');
	const [ search, setSearch ] = React.useState('');

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography className={classes.title} variant="h6" noWrap>
						SmartQ Foods
					</Typography>
					{props.location.pathname === '/' ? (
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Dish"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput
								}}
								inputProps={{ 'aria-label': 'search' }}
								onChange={(event) => setSearch(event.target.value)}
							/>
						</div>
					) : null}
					<div className={classes.topLayout}>
						{props.location.pathname === '/cart' ? null : (
							<Link to="/cart">
								<Button className={classes.button}>
									<LocalGroceryStoreIcon />
								</Button>
							</Link>
						)}
						{props.location.pathname === '/' ? null : (
							<Link to="/">
								<Button className={classes.button}>
									<HomeSharpIcon />
								</Button>
							</Link>
						)}
					</div>
				</Toolbar>
			</AppBar>
			{props.location.pathname === '/cart' ? null : (
				<Button
					variant="contained"
					className={[ classes.topLayout, classes.button ]}
					onClick={() => setSorting(sort, setSort)}
				>
					<Typography>Sort {sort || sortTypes[0]}</Typography>
				</Button>
			)}
			<Switch>
				<Route path="/cart" exact>
					{withRouter((props) => <Cart {...props} />)}
				</Route>
				<Route path="/">{withRouter((props) => <Dishes search={search} sort={sort} {...props} />)}</Route>
			</Switch>
		</div>
	);
}
