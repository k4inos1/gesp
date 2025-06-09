import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: {
        user: User;
    }): Promise<{
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<Omit<User, "password">>;
}
