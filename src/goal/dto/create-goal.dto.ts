import { IsString, MinLength } from "class-validator";

export class CreateGoalDto {

    @IsString()
    @MinLength(5)
    description: string;
}
