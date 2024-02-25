import { User } from 'src/entities/user.entity';

export type AuthPayload = Pick<User, 'email' | 'password'>;

export type AuthResponse = {
    access_token: string;
    refresh_token: string;
};
