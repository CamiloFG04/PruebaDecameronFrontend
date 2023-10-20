import store from "@/store";

const isAuthenticatedGuard = async(to,from,next) => {

    const {success} = await store.dispatch('auth/checkAuthentication')

    if (success) next()
    else next({name: 'login'})
    
}

export default isAuthenticatedGuard