import axios from 'axios'

const API = axios.create({ baseURL: 'https://memories-mridul.herokuapp.com'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts = () => API.get('/posts')
export const createPosts = (newPost) => API.post('/posts', newPost)
export const updatePost =  (id, newPostData) => API.patch(`/posts/${id}`, newPostData)
export const deletePost  = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)

// const API = axios.create({ baseURL: 'http://localhost:5000'})
// const url = 'https://memories-mridul.herokuapp.com/posts'
// export const fetchPosts = () => axios.get(url)
// export const createPosts = (newPost) => axios.post(url, newPost)
// export const updatePost =  (id, newPostData) => axios.patch(`${url}/${id}`, newPostData)
// export const deletePost  = (id) => axios.delete(`${url}/${id}`)
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`)