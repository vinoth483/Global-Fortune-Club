import axios from "../interceptors/axios"
import { useState } from 'react';
import {useNavigate } from "react-router-dom";
import {useAuth} from "../context/authProvider"

export const useSigninUser=()=>{
    const [isSigninError,setIsSigninError]=useState(false)
    const [signinError,setSigninError]=useState("")
    const [isSigninLoading,setIsSigninLoading]=useState(false)
    const navigate = useNavigate();
    const {setAuth}=useAuth()

    const signinUser=(data)=>{
        
        setIsSigninLoading(true)
        setIsSigninError(false)
        setSigninError("")
        console.log(data)

        if(data.email==="" || data.password===""){
            setIsSigninError(true)
            setSigninError("Please enter all the mandatory details")
            setIsSigninLoading(false)
            return;
        }
        axios.post(`/auth/admin/login`,data)
            .then(resp=>{
                console.log(resp)
                setIsSigninLoading(false)
                setAuth(resp.data.data,true)
                navigate("/dashboard");
            })
            .catch(err=>{
                console.log(err)
                setIsSigninError(true)
                setSigninError(err?.response.data.message)
                setIsSigninLoading(false)
                
            })
    }

    return {isSigninError,signinError,isSigninLoading,signinUser}
}