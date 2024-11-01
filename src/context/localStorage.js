
export const setAuth=(data,isAuthenticated,setAccessTokenOnly=false)=>{
    console.log(data)
    if(setAccessTokenOnly){
        localStorage.setItem('accessToken',data?.accessToken )
    }else{
        localStorage.setItem('accessToken',data?.accessToken )
        localStorage.setItem('refreshToken',data?.refreshToken)
        localStorage.setItem('supportId',data?.supportId)
        localStorage.setItem('senderId',data?._id)
        localStorage.setItem('userId',data?.userId)
        localStorage.setItem('name',data?.name)
        localStorage.setItem('email',data?.email)
        localStorage.setItem('isAuthenticated',isAuthenticated)
        
    }
}
export const clearAuth=()=>{
    localStorage.removeItem('accessToken' )
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('supportId')
    localStorage.setItem('senderId')
    localStorage.setItem('userId')
}
export const getAuth=()=>{
    return {
        accessToken: localStorage.getItem('accessToken' ),
        refreshToken:localStorage.getItem('refreshToken'),
        userId:localStorage.getItem('userId'),
        name:localStorage.getItem('name'),
        email:localStorage.getItem('email'),
        isAuthenticated:localStorage.getItem('isAuthenticated'),
        supportId:localStorage.getItem('supportId'),
        senderId:localStorage.getItem('senderId')
    }
} 
