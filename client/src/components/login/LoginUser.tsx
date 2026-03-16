import "./LoginUser.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LSchema, LType } from "../../validation/Schema";
import { UserAPI } from "../../global/UserAPI";

export const LoginUser = () => {
    const [loginUser, { isLoading }] = UserAPI.useLogMutation();
    const { register, handleSubmit, formState: { errors }
    } = useForm<LType>({
        resolver: zodResolver(LSchema)
    });

    const onSubmit = async (data: LType) => {
        try {
            const result = await loginUser(data).unwrap();
            localStorage.setItem("token", result.token);
            alert("Logged In!");
        } catch (error) {
            alert("Login has Failed!");
        }
    };

    return (
        <form 
            className="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2>Login</h2>
            <input placeholder="Email" {...register("email")} />
            {errors.email && <p>{errors.email?.message}</p>}

            <input 
                type="password" 
                placeholder="Password" 
                {...register("password")}
            />
            {errors.password && <p>{errors.password?.message}</p>}

            <button disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};


