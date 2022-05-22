import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, EDIT_ITEM, ITEMS_LOADING} from './types';
import axios from 'axios';

export const getItems = () => (dispatch) => {
    dispatch(setItemsLoading());
    axios.get(`http://localhost:5000/api/items`)
      .then(res =>
        dispatch({
          type: GET_ITEMS,
          payload: res.data
        })
      )
      .catch(error => {
        console.log(error)
        console.log(error.response)
        console.log(error.response.data)
        console.log(error.response.data.error)
     })
  };
export const deleteItem = (id) => dispatch => {
    axios
        .delete(`http://localhost:5000/api/items/${id}`)
        .then(res =>
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    );
};

export const addItem = (item) => dispatch => {
    axios
        .post('http://localhost:5000/api/items', item)
        .then(res => 
            dispatch({
                type: ADD_ITEM, 
                payload: res.data
            })
        )
        .catch(error => {
            console.log(item)
            console.log(error.response)
            console.log(error.response.data)
            console.log(error.response.data.error)
         })
};

export const editItem = (id, newName) => dispatch => {
    axios
        .put(`http://localhost:5000/api/items/${id}`, {_id: id, name: newName})
        .then(res => 
            dispatch({
                type: EDIT_ITEM, 
                payload: res.data
            })
        )
        .catch(error => {
            console.log(error.response)
            console.log(error.response.data)
            console.log(error.response.data.error)
         })
};
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}