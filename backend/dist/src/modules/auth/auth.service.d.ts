import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
}
type UserResponse = Omit<User, "password">;
type CreateUserDto = Pick<User, "email" | "password" | "name">;
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<UserResponse | null>;
    login(user: UserResponse): Promise<{
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<UserResponse>;
}
export {};
