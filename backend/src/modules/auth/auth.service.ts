import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

type UserResponse = Omit<User, "password">;
type CreateUserDto = Pick<User, "email" | "password" | "name">;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<UserResponse | null> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user; // Changed unused variable name from "_" to "password"
      return result;
    }
    return null;
  }

  async login(user: UserResponse) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersService.create(createUserDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user; // Changed unused variable name from "_" to "password"
    return result;
  }
}
