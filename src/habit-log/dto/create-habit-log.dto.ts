import { IsIn, IsISO8601, IsOptional, IsString, IsUUID } from "class-validator";
import { HabitLogStatus } from "../enum/habitLogStatus";

export class CreateHabitLogDto {
    @IsUUID()
    habitId: string

    @IsISO8601()
    date: string;

    @IsString()
    @IsIn(Object.values(HabitLogStatus))
    status: HabitLogStatus;

    @IsString()
    @IsOptional()
    note?: string;
}
