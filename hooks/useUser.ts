"use client";
import { supabase } from "@/config/supabase";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data?.user) {
      setUser(data?.user);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/auth/signin");
  };

  useEffect(() => {
    getUser();
  }, []);




const {}= useMutation({
  mutationFn: async()=> {
    
  }
})


  return { user, setUser, logout };
}
