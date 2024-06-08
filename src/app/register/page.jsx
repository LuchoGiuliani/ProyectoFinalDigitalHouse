"use client";
import Navbar from "@/components/navbar/Navbar";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Importar js-cookie

const BASE_URL = "https://digitalmoney.digitalhouse.com";

const Page = () => {
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    dni: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      setPasswordError("");
    }
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validarPassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9])(?=.{6,20}$)/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateRequiredFields = () => {
      const requiredFields = [
        "firstname",
        "lastname",
        "dni",
        "email",
        "password",
        "phone",
      ];
      let hasError = false;

      requiredFields.forEach((field) => {
        if (!formData[field]) {
          hasError = true;
        }
      });

      setRequiredFieldsError(hasError);
      return !hasError;
    };

    const requiredFieldsValid = validateRequiredFields();
    if (!requiredFieldsValid) {
      return; // Detener el envío del formulario si los campos requeridos no están completos
    }

    try {
      const { email, password, firstname, lastname, dni, phone } = formData;

      if (!validarPassword(password)) {
        setPasswordError("Contraseña incorrecta.");
        return;
      }
      if (password !== confirmPassword) {
        setPasswordError("Las contraseñas no coinciden");
        return;
      }

      // Convertir dni a número
      const userDataToSend = { email, password, firstname, lastname, dni: Number(dni), phone };

      console.log("Datos a enviar:", userDataToSend); // Registro de los datos antes de enviarlos

      const response = await fetch(`${BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Obtener detalles del error del servidor
        console.error("Error del servidor:", errorData);
        throw new Error("Error al crear la cuenta");
      }

      const data = await response.json();
      console.log("Usuario creado:", data);

      // Almacenar user_id y user_account como cookies
      Cookies.set("user_id", data.user_id);
      Cookies.set("user_account", data.user_account);

      // Redirigir a otra página o realizar alguna acción adicional
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="h-screen bg-[#052A2D]">
      <Navbar />
      <div className="flex flex-col gap-2 p-4 justify-center items-center">
        <h1 className="text-white text-center">Crear Cuenta</h1>
        <form
          className="flex flex-col justify-center items-center gap-2"
          onSubmit={handleSubmit}
        >
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Nombre*"
          />
          {requiredFieldsError && (
            <p className="text-red-500 text-sm">Completar casillero</p>
          )}
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Apellido*"
          />
          {requiredFieldsError && (
            <p className="text-red-500 text-sm">Completar casillero</p>
          )}
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            placeholder="DNI*"
          />
          {requiredFieldsError && (
            <p className="text-red-500 text-sm">Completar casillero</p>
          )}
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico*"
          />
          {requiredFieldsError && (
            <p className="text-red-500 text-sm">Completar casillero</p>
          )}
          <h3 className="text-[16px] text-white font-light max-w-[300px]">
            Usa entre 6 y 20 caracteres, debe contener al menos 1 carácter
            especial, una mayúscula y un número.
          </h3>
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña*"
          />
          {requiredFieldsError && (
            <p className="text-red-500 text-sm">Completar casillero</p>
          )}
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="password"
            placeholder="Confirmar Contraseña*"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
          />
          {requiredFieldsError && (
            <p className="text-red-500 text-sm">Completar casillero</p>
          )}
          <input
            className="rounded-md max-w-[300px] p-2 w-full"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Teléfono*"
          />
          {requiredFieldsError && (
            <p className="text-red-500 text-sm">Completar casillero</p>
          )}
          <button
            className="bg-[#0AEB8C] rounded-md text-center max-w-[300px] w-full"
            type="submit"
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    </section>
  );
};

export default Page;
