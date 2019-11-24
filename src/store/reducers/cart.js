import * as actions from '../actions';
const initialState = {
	cart: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.UPDATE_CART:
			return { cart: action.payload };
		default:
			return state;
	}
};

export default reducer;
