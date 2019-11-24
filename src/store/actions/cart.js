import * as actions from '../actions'

export const updateCart = cart => {
    console.log('Updating global cart', cart)
    return {
        type: actions.UPDATE_CART,
        payload: cart
    }

}