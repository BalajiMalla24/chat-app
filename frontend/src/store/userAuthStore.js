import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { io  } from 'socket.io-client'

const BASE_URL = 'http://localhost:5000'

export const userAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    checkingAuth: async () => {
        try {
            const res = await axiosInstance.get('/users/check')
            set({ authUser: res.data.message })
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkingAuth", error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    signUp: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/users/signup', data)
            set({ authUser: res.data })
            toast.success("Account successfully created")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed")
        } finally {
            set({ isSigningUp: false })
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post('/users/login', data)
            set({ authUser: res.data })
            toast.success("Logged in Successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        } finally {
            set({ isLoggingIn: false })
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post('/users/logout')
            set({ authUser: null })
            toast.success("User logged out successfully")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed")
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.patch("/users/update-profile", data)
            set({ authUser: res.data })
            toast.success("User credentials updated")
        } catch (error) {
            toast.error("Error updating user credentials")
        } finally {
            set({ isUpdatingProfile: false })
        }
    },
    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id

            }
        });
        socket.connect()
        set({ socket: socket })
       socket.on("getOnlineUsers" , (userIds)=>{
          console.log(userIds);
          set({onlineUsers:userIds})
       })
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket?.disconnect()
    }
}))
