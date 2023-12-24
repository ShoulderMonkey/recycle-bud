import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { USERS_SEED } from "./seeds/user.seed";
@Injectable()
export class SeederService {

    private logger = new Logger(SeederService.name);

    constructor(
        private userService: UserService,
    ) {

    }

    async seed() {
        await this.createUsers();    
    }

    async createUsers() {
        for(let seed of USERS_SEED){
            try {
                await this.userService.repository.findOneByOrFail({email: seed.email})
            } catch (error) {
                await this.userService.createOne(seed)
                this.logger.log(`User ${seed.email} created`)
            }
        }
    }
}