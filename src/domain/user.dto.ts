import { IsEmail, IsString } from 'class-validator';
export class UserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    phone: number;

    @IsString()
    dni: string;

    @IsString()
    address: string;
}