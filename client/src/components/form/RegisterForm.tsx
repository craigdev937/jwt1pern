import "./RegisterForm.css"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RSchema, RType } from "../../validation/Schema";
import { UserAPI } from "../../global/UserAPI";

export const RegisterForm = () => {
    const [regUser] = UserAPI.useRegMutation();
    const { register, handleSubmit, 
        formState: { errors }} = useForm<RType>({
        resolver: zodResolver(RSchema)
    });

    const onSubmit = async (data: RType) => {
        await regUser(data);
    };

    return (
        <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <input 
                placeholder="First Name" 
                autoComplete="given-name"
                {...register("first")} 
            />
            {errors.first && <p>{errors.first?.message}</p>}
            
            <input 
                placeholder="Last Name" 
                autoComplete="family-name"
                {...register("last")} 
            />
            {errors.last && <p>{errors.last?.message}</p>}

            <input 
                placeholder="Email" 
                autoComplete="email"
                {...register("email")} 
            />
            {errors.email && <p>{errors.email?.message}</p>}

            <input 
                type="password" 
                placeholder="Password" 
                autoComplete="new-password"
                {...register("password")} 
            />
            <button>Register User</button>
        </form>
    );
};


