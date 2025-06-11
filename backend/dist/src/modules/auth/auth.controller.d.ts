import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    register(registerDto: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        name: string;
        id: string;
        email: string;
        createdAt: Date;
    }>;
}
