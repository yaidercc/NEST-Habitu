import { IsArray, IsBoolean, IsIn, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min, ValidateIf } from "class-validator"
import { CustomDay, FrequencyType } from "../enum/frequency-type";

export class CreateHabitDto {

    @IsString()
    description: string;

    @IsBoolean()
    @IsOptional()
    is_custom?: boolean;

    @IsUUID()
    systemId: string;

    @IsUUID()
    identityId: string;

    @IsString()
    @IsIn(Object.values(FrequencyType))
    frequency_type: FrequencyType;

    // @ValidateIf(o => o.frequency_type === FrequencyType.custom)
    // @IsArray()
    // @IsIn(Object.values(CustomDay), { each: true })
    // custom_days?: CustomDay[]

    // @ValidateIf(o => o.frequency_type === FrequencyType.monthly || o.frequency_type === FrequencyType.weekly)
    @IsNumber()
    @IsPositive()
    @Min(1)
    frequency_target: number;
}