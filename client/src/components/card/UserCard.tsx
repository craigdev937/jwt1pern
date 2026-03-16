import "./UserCard.css";
import { IUser } from "../../models/Interfaces";

type USER = {
    user: IUser
};

export const UserCard = ({ user }: USER) => {
    const formatDate = (dateString?: string) => {
        if (!dateString) return "Date Unknown!";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <article className="user__card">
            <h3>{user.first} {user.last}</h3>
            <p>{user.email}</p>
            <small>
                Created: {formatDate(user.created_at)}
            </small>
        </article>
    );
};



