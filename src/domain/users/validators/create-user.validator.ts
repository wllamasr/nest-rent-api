import { IsAlpha, IsEmail, IsString, IsNumber } from 'class-validator';
export class CreateUserValidator {
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