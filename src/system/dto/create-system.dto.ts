import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class CreateSystemDto {
    
    @IsString()
    @MinLength(5)
    description: string;

    @IsBoolean()
    @IsOptional()
    is_custom?: boolean;
}
