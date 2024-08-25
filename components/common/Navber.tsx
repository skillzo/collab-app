"use client";
import useUser from "@/hooks/useUser";
import React from "react";

export default function Navber() {
  const { user, logout } = useUser();

  return (
    <div className="fbc h-[7vh] border-b px-3 pt-1">
      <p className="text-sm font-semibold">Collab</p>

      {user && (
        <div className="fc gap-2">
          <div onClick={() => logout()}>
            <Logout />
          </div>

          <div className="w-10 h-10 fcc rounded-full bg-purple-600 text-white uppercase">
            {user?.email?.charAt(0)}
          </div>
        </div>
      )}
    </div>
  );
}

const Logout = (props: any) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <path
        d="M7.5 1a6.453 6.453 0 0 0-4.21 1.563v.003a5.841 5.841 0 0 0-.485.457c-.047.047-.098.094-.14.141a.652.652 0 0 0-.063.094 6.14 6.14 0 0 0-.57.742h1.23c.113-.137.238-.262.363-.387l.176-.175c.004 0 .004-.004.008-.008.156-.14.324-.274.496-.395A5.43 5.43 0 0 1 7.5 2C10.543 2 13 4.457 13 7.5a5.493 5.493 0 0 1-9.21 4.05c-.044-.038-.08-.077-.118-.116a5.343 5.343 0 0 1-.41-.434h-.153a.55.55 0 0 0-.16 0h-.918c.172.266.367.512.57.75.02.027.04.059.063.082.027.035.063.063.094.094.07.078.148.152.226.23.075.07.145.14.22.207.085.078.175.149.265.219.086.066.164.137.25.2.023.011.039.027.062.042v-.004A6.468 6.468 0 0 0 7.5 14c3.586 0 6.5-2.914 6.5-6.5S11.086 1 7.5 1ZM3 5 .5 7.5 3 10V8h7V7H3Z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "#000",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(1.48 0 0 1.48 1.27 .9)"
      />
    </svg>
  );
};
