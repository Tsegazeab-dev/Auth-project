import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='max-w-lg mx-auto p-3'>
        <h1 className="text-3xl font-semibold text-center mt-5">Sign Up</h1>
        <form className='flex flex-col gap-4 mt-5'>
            <input type="text" placeholder='Username' className="bg-slate-100 p-3 rounded-lg"/>
            <input type="email" placeholder='Email'
            className="bg-slate-100 p-3 rounded-lg" />
            <input type="password" placeholder='Password' className="bg-slate-100 p-3 rounded-lg" />
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase mt-3 hover:opacity-95 disabled:bg-opacity-80">Sign up</button>
        </form>
        <div className='flex gap-2 mt-5 '>
            <p>Have already an account?</p>
            <Link to='/sign-in'>
            <span className='text-blue-500'>sign in</span>
            </Link>
            
        </div>
    </div>
  )
}
