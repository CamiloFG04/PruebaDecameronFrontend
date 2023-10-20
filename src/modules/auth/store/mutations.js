
export const createUser = (state,user) => {

    state.user = user
}

export const loginUser = (state,{user,access_token}) => {

    if (access_token) {
        localStorage.setItem('access_token',access_token)
        state.access_token = access_token
    }


    state.user = user
    state.status = 'authenticated'
}

export const logout = (state) => {
    state.user = null
    state.access_token = null
    state.status = 'not-authenticated'
    localStorage.removeItem('access_token')

}