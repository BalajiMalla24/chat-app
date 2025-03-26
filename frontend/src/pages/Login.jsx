import React, { useState } from 'react'
import { userAuthStore } from '../store/userAuthStore'
import {MessageSquare , User , Loader2 , Eye , EyeOff , Lock} from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
const Login = () => {
    const {login ,isLoggingIn} = userAuthStore()
    const [showPassword , setshowPassword] =useState(false)
    const [formData , setFormdata] = useState({
        email:"",
        password:""
    })
    const handleSubmit = async (e) =>{
        e.preventDefault()
        login(formData)
    }
    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
        <div className='flex flex-col justify-center items-center p-6 sm:p-12  '>
            <div className='w-full max-w-md space-y-8 mb-10'>
               <div className='text-center mb-8 '>
                <div className='flex flex-col items-center gap-2 group'>
                    <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                    <MessageSquare className='size-6 text-primary'/>
                    </div> 
                    <h1 className='text-2xl font-bold mt-2'>Login to your account</h1>
                         
                </div>

               </div>
               <form onSubmit={handleSubmit} >
       
         <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="size-5 text-base-content/40" />
            </div>
            <input
              type="text"
              className={`input input-bordered w-full pl-10`}
              placeholder="gmail@example.com"
              value={formData.email}
              onChange={(e) => setFormdata({ ...formData, email: e.target.value })}
            />
          </div>
         </div> 
         <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="size-5 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" :"password"}
              className={`input input-bordered w-full pl-10`}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormdata({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-5 text-base-content/40" />
              ) : (
                <Eye className="size-5 text-base-content/40" />
              )}
            </button>
            
          </div>
         </div>
         <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
          {isLoggingIn ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Login"
          )}
        </button>
        

               </form>
    
      <div className="text-center">
        <p className="text-base-content/60">
          Already have an account?{" "}
          <Link to="/signup" className="link link-primary">
            sign-up
          </Link>
        </p>
        </div>
      </div>
    </div>
    <AuthImagePattern
       title={"Join the community"}
       subtitle={"Connnect with friends stay in touch"}
    />
  </div>
    )
}

export default Login
