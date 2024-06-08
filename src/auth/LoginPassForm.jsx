"use client";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginScheme from "@/schemas/login.scheme";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEmail } from "@/context/emailContext";
import { useAuth } from "@/context/authContext";

const BASE_URL = "https://digitalmoney.digitalhouse.com";

const LoginPassForm = () => {
  const { login , token, setToken, setEmail} = useAuth();
  const { email } = useEmail();
  const router = useRouter();
  const [serverError, setServerError] = useState(null);
 

  const methods = useForm({
    resolver: yupResolver(LoginScheme),
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const loginResponse = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (loginResponse.ok) {
        
        const responseData = await loginResponse.json();
       
        const tokenResponse = responseData.token;
        window.localStorage.setItem("token", JSON.stringify(tokenResponse));
        setToken(tokenResponse)
        setEmail(email)
        

        // login(responseData.user, tokenResponse);

        router.push("/");

      } else {
        const errorData = await loginResponse.json();
        console.error("Error during login:", errorData.error);
        setServerError("Tus credenciales son inválidas");
      }
    } catch (e) {
      console.error("Error during login:", e);
      setServerError("Ha ocurrido un error. Intente más tarde.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...methods.register("email")}
          placeholder="Correo electrónico"
          type="email"
          autoComplete="off"
          defaultValue={email}
          style={{ display: "none" }}
        />
        <input
          {...methods.register("password")}
          placeholder="Contraseña"
          type="password"
          autoComplete="current-password"
        />
        <button type="submit">Ingresar</button>
        {serverError && <div className="text-red-600">{serverError}</div>}
      </form>
    </FormProvider>
  );
};

export default LoginPassForm;
