import React from "react";
import "./Home.css";
import { UserAPI } from "../../global/UserAPI";
import { Spinner } from "../../components/spin/Spinner";
import { UserCard } from "../../components/card/UserCard";

export const Home = () => {
    const { error, isLoading, 
        data } = UserAPI.useAllQuery();
    const US = data?.data;
    console.log(US);

    if (error) {
        if ("status" in error) {
            const errMSG = "error" in error ?
                error.error :
                JSON.stringify(error.data);
            return <h1>Error: {errMSG}</h1>
        } else {
            return <h1>Error: {error.message}</h1>
        }
    };
    
    return (
        <React.Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                <main className="users__cont">
                    <section className="users__grid">
                        {US?.map((user) => (
                            <UserCard 
                                key={user.id} 
                                user={user} 
                            />
                        ))}
                    </section>
                </main>
            )}
        </React.Fragment>
    );
};


