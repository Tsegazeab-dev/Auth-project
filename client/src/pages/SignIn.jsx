import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import {useSelector, useDispatch} from 'react-redux'

export default function SignIn() {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const {loading, error} = useSelector(state=>state.user)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data))
        return;
      }
      dispatch(signInSuccess(data))
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err))
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center mt-5">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase mt-3 hover:opacity-95 disabled:bg-opacity-80"
        >
          {loading ? "Loading ..." : "sign in"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 ">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error.statusCode !== 500 ? error.message  : "something went wrong"}
      </p>
    </div>
  );
}
