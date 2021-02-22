import { UserDTO } from "asv-api-client";

export class LoginDTO implements UserDTO {
    birthDate?: Date;
    email?: string;
    id?: number;
    lastName?: string;
    name?: string;
    password?: string;
    phone?: string;
    roles?: Array<UserDTO.RolesEnum>;
    username?: string;
}

export class RegistroDTO {
    username: string;
    password: string;
    email: string;
}