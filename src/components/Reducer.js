export const initialState = {
    cart : [],
    user:null
};

export const actionTypes = {
    ADD_TO_CART:"ADD_TO_CART",
    REMOVE_FROM_CART:"REMOVE_FROM_CART",
    SET_USER:"SET_USER",
    EMPTY_CART:"EMPTY_CART"
};

export const getTotalMoney = (cart) => cart?.reduce((amount,item) => (item.price * item.qty)+amount,0);


const reducer = (state = initialState,action) => {
    switch(action.type)
    {
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart,action.item],
            };
        
        case actionTypes.REMOVE_FROM_CART:{

            const index = state.cart.findIndex(
                (cartItem) => cartItem.id === action.id
            );
            
            let newCart = [...state.cart]

            if(index>=0)
            {
                newCart.splice(index,1);
            }
            else
            {
                console.warn("You cannot remove that item as it is not in the basket")
            }

            return{
                ...state,
                cart: newCart
            };
        }

        case actionTypes.SET_USER:{
            return{
                ...state,
                user:action.user
            }
        }

        case actionTypes.EMPTY_CART:{
            const newCart = [];
            return{
                ...state,
                cart:newCart
            }
        }
        default:
            return state;     
    }
};

export default reducer;
