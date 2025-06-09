import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null>;
    login(user: {
        email: string;
        id: string;
    }): Promise<{
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>>;
}
