import { createSlice } from '@reduxjs/toolkit'
import UserSession from '../../services/auth'

const initialState = {
    access_token: null,
    users: [],
    message : "",
    isError: false,
    isLoadingUsers : false,
    loginSuccess: false,
}

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fetchLogin(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
                loginSuccess: false,
            }
        },
        fetchLoginSuccess(state, action) {
            UserSession.setUser(action.payload)
            return {
                ...state,
                isLoading: false,
                loginSuccess: true,
            }
        },
        fetchLoginFailed(state, action) {
            return {
                ...state,
                message: action.payload.response.data['error'],
                isLoading: false,
                isError: true,
                loginSuccess: false,
            }
        },
        fetchRegister(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        fetchRegisterSuccess(state, action) {
            return {
                ...state,
                user: action.payload.data,
                isLoading: false,
                message: "User Register Successfully"
            }
        },
        fetchRegisterFailed(state, action) {
            return {
                ...state,
                isLoading: false,
                message: action.payload.response.data['error'],
                isError: true,
            }
        },
        passwordReset(state, action) {
            return {
                ...state,
                isLoading: true,
                message: '',
            }
        },
        passwordResetSuccess(state, action) {
            return {
                ...state,
                user: action.payload.data,
                isLoading: false,
                message: 'Password Changed Successfully',
                isError: false,
            }
        },
        passwordResetFailed(state, action) {
            console.log(action.payload.response.data)
            return {
                ...state,
                isLoading: false,
                message: action.payload.response.data['error'],
                isError: true,
            }
        },

        fetchUsers(state, action) {
            return {
                ...state,
                isLoadingUsers: true,
                message: '',
            }
        },
        fetchUsersSuccess(state, action) {
            return {
                ...state,
                users: action.payload,
                isLoadingUsers: false,
                isError: false,
            }
        },
        fetchUsersFailed(state, action) {
            console.log(action.payload.response.data)
            return {
                ...state,
                isLoadingUsers: false,
                message: action.payload.response.data['error'],
                isError: true,
            }
        },

        logout(state, action) {
            UserSession.removeUser()
            return {
                ...state,
                isLogout: true,
            }
        },
        logoutSuccess(state, action) {
            UserSession.removeUser()
            return {
                ...state,
                isLogout: false,
                isError: false,
            }
        },
        logoutFailed(state, action) {
            UserSession.removeUser()
            console.log(action.payload.response.data)
            return {
                ...state,
                isLogout: false,
                message: action.payload.response.data['error'],
                isError: true,
            }
        },
        resetStateItems(state, action) {
            return {
                ...state,
                message: '',
                isError: false,
            }
        },
    },
})

export const {
    fetchLogin,
    fetchLoginSuccess,
    fetchLoginFailed,
    fetchRegister,
    fetchRegisterSuccess,
    fetchRegisterFailed,
    passwordReset,
    passwordResetSuccess,
    passwordResetFailed,
    fetchUsers,
    fetchUsersSuccess,
    fetchUsersFailed,
    logout,
    logoutSuccess,
    logoutFailed,
    resetStateItems,
} = authReducer.actions

export default authReducer.reducer
