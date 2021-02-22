import { UserDTO } from "asv-api-client";
import { Role } from "./role";

export class UserViewDTO implements UserDTO {
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