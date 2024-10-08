"use client";

import { supabase } from "@/config/supabase";
import useUser from "@/hooks/useUser";
import { base_url } from "@/utils/constants";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiSolidHide } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

export default function SignUpForm() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const [cred, setCred] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: cred.email,
      password: cred.password,
    });

    if (error) {
      console.log("sign up error", error);
    }

    if (data) {
      router.push("/auth/signin");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src="/logo.png" className="mx-auto  w-10" />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Resigter your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
                autoComplete="email"
                className="primary-input"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>

            <div className="relative mt-2 border rounded-xl">
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                minLength={4}
                required
                onChange={handleChange}
                autoComplete="current-password"
                className=" outline-none border-none rounded-xl  bg-white w-full  p-2 focus-within:bg-transparent focus:bg-transparent"
              />

              <div
                onClick={() => setShowPass(!showPass)}
                className="absolute right-2 top-2 text-2xl "
              >
                {!showPass ? <AiOutlineEye /> : <BiSolidHide />}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={handleSignUp}
              className="primary-button w-full"
            >
              Sign up
            </button>

            <button
              type="button"
              onClick={handleSignUp}
              className="fcc gap-2 py-2 text-black border rounded-lg w-full text-sm font-semibold"
            >
              <FcGoogle size={25} />
              <span> Sign up with google </span>
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            href="/auth/signin"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 underline"
          >
            sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
