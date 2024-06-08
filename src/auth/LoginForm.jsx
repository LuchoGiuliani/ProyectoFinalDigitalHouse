import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import LoginScheme from "@/schemas/login.scheme";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEmail } from "@/context/emailContext";

const BASE_URL = "https://digitalmoney.digitalhouse.com"

const LoginForm = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState(null);
    const methods = useForm({
        resolver: yupResolver(LoginScheme)
    });
    const { handleSubmit } = methods; // Obtenemos handleSubmit de methods
    const { setEmail } = useEmail(); // Obtenemos setEmail del contexto global

    const onSubmit = (data) => {
        setEmail(data.email); // Almacena el email en el estado global
        router.push('/loginPassword');
    }

    return (
        <FormProvider {...methods}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <input  
                    {...methods.register("email")}
                    placeholder="Correo electrónico"
                    type="email" autoComplete="off" />
               <button type="submit">Enviar</button>
                <div className="border border-[#0AEB8C] text-[#0AEB8C] rounded-md p-2">Continua con Google</div>
                {serverError && <div className="text-red-600">{serverError}</div>}
            </form>
        </FormProvider>
    );
}

export default LoginForm;
