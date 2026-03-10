import "./UserCard.css";
import { IUser } from "../../models/Interfaces";

type USER = {
    user: IUser
};

export const UserCard = ({ user }: USER) => {
    return (
        <article className="user__card">
            <h3>{user.first} {user.last}</h3>
            <p>{user.email}</p>
            <small>
                Created: {new Date(user.created_at)
                    .toLocaleDateString()}
            </small>
        </article>
    );
};



