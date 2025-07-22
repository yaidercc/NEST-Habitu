import { Test } from "@nestjs/testing"
import { SystemService } from "./system.service"
import { Repository } from "typeorm";
import { System } from "./entities/system.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("System services tests", () => {
    let service: SystemService;
    let repository: jest.Mocked<Repository<System>>;

    beforeAll(async ()=>{
        const module = await Test.createTestingModule({
            providers: [
                SystemService,
                {
                    provide: getRepositoryToken(System),
                    useValue: {
                        create: jest.fn()
                    }
                }
            ]
        }).compile()
        
       service = module.get<SystemService>(SystemService);
    repository = module.get(getRepositoryToken(System));
    })


    it("",()=>{

    })
}) 