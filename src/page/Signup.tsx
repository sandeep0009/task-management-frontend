import { motion } from "framer-motion";
import React, { useState } from "react";
import { axiosInstance } from "../helper/axiosInstance";
import { useNavigate } from "react-router-dom";

type formData={
    email:string;
    password:string;
    name:string;
}
export const Signup = () => {
    const[formData,setFormData]=useState<formData>({
        email:"",
        password:"",
        name:""
    });
    const router=useNavigate();

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(formData);
        console.log("clicked")
        const res=await axiosInstance.post('/signup',formData);
        if(res.status===200){
            localStorage.setItem("token",res.data.token);
            router('/task');
        }
    }
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setFormData({...formData,name:e.target.value})}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setFormData({...formData,email:e.target.value})}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account? 
            <a href="/signin" className="text-blue-500 hover:underline">Sign In</a>
          </p>
        </motion.div>
      </div>
    );
  };
  
  