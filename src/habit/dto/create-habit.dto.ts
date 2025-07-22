import { IsArray, IsIn, IsNumber, IsPositive, IsString, Min, ValidateIf } from "class-validator"
import { FrequencyType } from "../enum/frequency-type";

export class CreateHabitDto {

    @IsString()
    description: string;

    @IsString()
    @IsIn(Object.values(FrequencyType))
    frequency_type: string;

    @ValidateIf(o => o.frequency_type === FrequencyType.custom)
    @IsArray()
    @IsString({ each: true })
    custom_days?: string[]

    @ValidateIf(o => o.frequency_type === FrequencyType.monthly || o.frequency_type === FrequencyType.weekly)
    @IsNumber()
    @IsPositive()
    @Min(1)
    frequency_target?: number;
}