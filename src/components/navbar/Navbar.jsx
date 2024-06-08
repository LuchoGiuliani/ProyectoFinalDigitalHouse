"use client";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://digitalmoney.digitalhouse.com";

const Navbar = () => {
  const { user, isAuthenticated, logout,token, setToken } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user_id = Cookies.get("user_id");
  const [token2, setToken2] = useState(null)
   console.log("token2", token2);
  console.log("user_id: ", user_id);
 useEffect(() => {
  setToken2(JSON.parse(window.localStorage.getItem("token")))
  const fetchUserData = async () => {
    if (user_id && token2) {
      try {
        const response = await axios.get(`${BASE_URL}/api/users/${user_id}`, {
          headers: {
            "Authorization": token2, 
            'Content-Type': 'application/json'
          }
        });
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  if (user_id && token2) {
    fetchUserData();
  } else {
    setIsLoading(false);
  }
}, [user_id, token2]);

  return (
    <div className="bg-[#052A2D] flex justify-between px-4 py-2 items-center">
      <section>
        <Link href={"/"}>
          <Image
            className="w-auto h-auto"
            src={"/logo.png"}
            alt="Logo"
            width={96}
            height={43}
            priority
          />
        </Link>
      </section>
      <section className="flex gap-4 items-center">
        {isAuthenticated() ? (
          <>
            <span className="text-white">Hola, {userData?.firstname}</span>
            <button
              onClick={logout}
              className="bg-[#0AEB8C] p-2 rounded-md text-[#052A2D] font-bold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href={"/login"}
              className="border border-[#0AEB8C] p-2 rounded-md text-[#0AEB8C] font-bold"
            >
              Ingresar
            </Link>
            <Link
              href={"/register"}
              className="bg-[#0AEB8C] p-2 rounded-md text-[#052A2D] font-bold"
            >
              Crear Cuenta
            </Link>
          </>
        )}
      </section>
    </div>
  );
};

export default Navbar;
