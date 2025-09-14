import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!! 
// I SWITCHED TO PERMANENT DOMAIN
const url = '/react-useReducer-cart-project'
const AppContext = React.createContext();

// initial state
const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}
// reducer function


const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({type:'CLEAR_CART'});
  }
  const remove = (id) => {
    dispatch({type: 'REMOVE', payload: id})
  }
  const increase = (id) => { 
    dispatch({type: 'INCREASE', payload: id});
  }
  const decrease = (id) => {
    dispatch({type: 'DECREASE', payload:  id});
  }

  // fetch api
  const fetchData = async () => { 
    dispatch({type: 'LOADING'}); // yabda ylowdi w houa ycollecti f data
    const response = await fetch(url);
    const cart = await response.json(); // lezmin hadhom ystana hata ykamalhom sinn erreur
    dispatch({type: 'DISPLAY_ITEMS', payload:cart});
  }
  // we will call api only when the app renders
  useEffect(()=>{
    fetchData();
  }, []);

  const toggleAmount = (id, type) => {
    dispatch({type:'TOGGLE_AMOUNT', payload: {id, type}});
  }

  useEffect(() => {
    dispatch({type: 'GET_TOTALS'})
  }, [state.cart]);

  return (// eli fl value houma l hwayej eli nheb npartagehom lel components lo5rin
    <AppContext.Provider value={{...state, clearCart, remove, increase, decrease, toggleAmount} /* ...state : les elts eli fl objet state */}> 
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
