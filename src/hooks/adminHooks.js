import {privateApi} from "../interceptors/axios"
import { useState } from 'react';
// import {useNavigate } from "react-router-dom";
// import {useAuth} from "../context/authProvider"


export const useGetDashboardInfo=()=>{
    const [isGetDashboardLoding,setGetDashboardLoding]=useState(false)
    const [isGetDashboardError,setIsGetDashboardError]=useState(false)
    const [dashboardError,setDashboardError]=useState("")
    const [data,setData]=useState({started: false})


    const getDashboardInfo=()=>{

        setGetDashboardLoding(true)
        setIsGetDashboardError(false)
        setDashboardError("")
        setData({started: false})

        privateApi.get("/user/admin/dashboard")
            .then(resp=>{
                setData(resp.data.data)
                setGetDashboardLoding(false)
            })
            .catch(err=>{
                console.log(err?.response.data.message)
                setIsGetDashboardError(true)
                setGetDashboardLoding(false)
                setDashboardError(err?.response.data.message)
            })
    }

    return {isGetDashboardLoding,isGetDashboardError,dashboardError,data,getDashboardInfo}

}

export const useGetUserList=()=>{
    const [isUserListError,setIsUserListError]=useState(false)
    const [userListError,setUserListError]=useState("")
    const [isUserListLoading,setIsUserListLoading]=useState(false)
    const [UserListData,setUserListData]=useState("")
    const [totalPages,setTotalPages]=useState(0)
    const getUserList=async(payload)=>{
        setIsUserListLoading(true)
        setIsUserListError(false)
        setUserListError("")
        setUserListData("")
        try{
            
            const resp = await privateApi.post('/user',payload)
            let tp = Math.ceil(resp.data?.count / payload?.limit)
            console.log(resp.data.data,tp)
            setTotalPages(tp)
            setIsUserListLoading(false)
            setUserListData(resp?.data?.data)
        }catch(err){
            console.log(err)
            setIsUserListLoading(false)
            setIsUserListError(true)
            setUserListError(err?.response.data.message)
        }
    }

    return {isUserListError,userListError,isUserListLoading,UserListData,getUserList,setUserListData,totalPages}
}

export const useFcSlotList=()=>{
    const [isFcSlotListError,setIsFcSlotListError]=useState(false)
    const [fcSlotListError,setFcSlotListError]=useState("")
    const [isFcSlotListLoading,setFcSlotListLoading]=useState(false)
    const [FcSlotListData,setFcSlotListData]=useState("")
    const [totalPages,setTotalPages]=useState(0)
    const getFcSlotList=async(payload)=>{
        setFcSlotListLoading(true)
        setIsFcSlotListError(false)
        setFcSlotListError("")
        setFcSlotListData("")
        try{
            
            const resp = await privateApi.post('/slot/admin',payload)
            let tp = Math.ceil((resp.data?.count || 0) / payload?.limit)
            console.log(resp.data.data,tp)
            setTotalPages(tp)
            setFcSlotListLoading(false)
            setFcSlotListData(resp?.data?.data)
        }catch(err){
            console.log(err)
            setFcSlotListLoading(false)
            setIsFcSlotListError(true)
            setFcSlotListError(err?.response.data.message)
        }
    }

    return {isFcSlotListError,fcSlotListError,isFcSlotListLoading,FcSlotListData,getFcSlotList,setFcSlotListData,totalPages}
}

export const useTransactionList=()=>{
    const [isTransactionListError,setIsTransactionListError]=useState(false)
    const [transactionListError,setTransactionListError]=useState("")
    const [isTransactionListLoading,setTransactionListLoading]=useState(false)
    const [TransactionListData,setTransactionListData]=useState("")
    const [totalPages,setTotalPages]=useState(0)
    const getTransactionList=async(payload)=>{
        setTransactionListLoading(true)
        setIsTransactionListError(false)
        setTransactionListError("")
        setTransactionListData("")
        try{
            
            const resp = await privateApi.post('/transaction/admin',payload)
            let tp = Math.ceil((resp.data?.count || 0) / payload?.limit)
            console.log(resp.data.data,tp)
            setTotalPages(tp)
            setTransactionListLoading(false)
            setTransactionListData(resp?.data?.data)
        }catch(err){
            console.log(err)
            setTransactionListLoading(false)
            setIsTransactionListError(true)
            setTransactionListError(err?.response.data.message)
        }
    }

    return {isTransactionListError,transactionListError,isTransactionListLoading,TransactionListData,getTransactionList,setTransactionListData,totalPages}
}

export const useGetSettings=()=>{
    const [isGetSettingsError,setIsGetSettingsError]=useState(false)
    const [getSettingsError,setGetSettingsError]=useState("")
    const [isGetSettingsLoading,setGetSettingsLoading]=useState(false)
    const [GetSettingsData,setGetSettingsData]=useState("")

    const getSettings=async()=>{
        setGetSettingsLoading(true)
        setIsGetSettingsError(false)
        setGetSettingsError("")
        setGetSettingsData("")
        try{
            
            const resp = await privateApi.get('/setting')

            setGetSettingsLoading(false)
            setGetSettingsData(resp?.data?.data)
        }catch(err){
            console.log(err)
            setGetSettingsLoading(false)
            setIsGetSettingsError(true)
            setGetSettingsError(err?.response.data.message)
        }
    }

    return {isGetSettingsError,getSettingsError,isGetSettingsLoading,GetSettingsData,getSettings,setGetSettingsData}
}