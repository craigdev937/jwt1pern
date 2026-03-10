export interface IUser {
    success: boolean,
    message: string,
    count: number,
    data: [{
        user_id: number,
        first: string,
        last: string,
        email: string,
        password: string,
        created_at: string,
        updated_at: string
    }]
};



