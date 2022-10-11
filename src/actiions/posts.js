import * as api from '../api/index'
// getPosts

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()

        dispatch({type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const createPosts = (newPost) => async (dispatch) => {
    try {
        const { data } = await api.createPosts(newPost)
        // console.log("aaya",data)
        dispatch({type: 'CREATE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, postData) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, postData)
        dispatch({type: 'UPDATE', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({type: 'DELETE', payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({type: 'LIKE_POST', payload : data})
    } catch (error) {
        console.log(error)
    }
}