import { IsString, IsNotEmpty } from 'class-validator';

export class TextScheduleDto{
    @IsString()
    @IsNotEmpty()
    prompt: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}