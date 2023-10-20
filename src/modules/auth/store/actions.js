import authApi from "@/api/authApi";

export const createUser = async ({commit},user) => {
    const {name,email,password} = user

    try {
        const {data} = await authApi.post('/register',{
            name,
            email,
            password,
        })
        
        const {success, message,user} = data


        commit('createUser',user)

        return {success, message}

    } catch (error) {
        return {success: false, message: error.response.data.message}
    }
}

export const signInUser = async ({commit},user) => {
    const {email,password} = user

    try {
        
        const {data} = await authApi.post('/login',{
            email,
            password,
        })
        const {access_token} = data
       
        delete user.password
        commit('loginUser',{
            user,
            access_token,
        })

        return {success: true, message:'Sesión iniciada'}

    } catch (error) {
        return {success: false, message: error.response.data.error}
    }
}

export const checkAuthentication = async ({commit}) => {
    const access_token = localStorage.getItem('access_token')
    
    if (!access_token) {
        commit('logout')
        return {success:false, message:'No estas autorizado'}
    }
    try {
        const {data} = await authApi.post('/me',null,{
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        })
        const {name, email} = data

        const user = {
            name,
            email
        }

        commit('loginUser',{
            user,
            access_token,
        })

        return {success: true, message: 'Usuario autenticado'}

    } catch (error) {
        commit('logout')
        return {success:false, message:error.response.data.message}
    }
}