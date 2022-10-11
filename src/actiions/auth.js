import React from 'react'
import { AUTH, LOGOUT } from '../actionTypes/actionTypes'
import * as api from '../api/index'

export const signIn = (formData, history) => async (dispatch) => {
    try {
        // log in the user
        const { data } = await api.signIn(formData)

        dispatch({ type: AUTH, data })

        history('/')
    } catch (error) {
        console.log(error)
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    try {
        // sign up the user
        const { data } = await api.signUp(formData)

        dispatch({ type: AUTH, data })

        history('/')
    } catch (error) {
        console.log(error)
    }
}
