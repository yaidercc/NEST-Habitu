import { IsString, IsUUID } from "class-validator";

export class CreateIdentityDto {

    @IsString()
    description: string;

    @IsUUID()
    goalId: string;
    @IsUUID()
    systemId: string;
}
