import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"



class UsersService {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);

    }
    //quando o usuário digitar o e-mail, verificar se o usuário está cadastrado
    //se não estiver, vai cadastrar ele, para ter o id do usuário
    async create(email: string) {
        
        //verificar se o usuário existe 
        const userExists = await this.usersRepository.findOne({
            email
        })

        //se existir, retornar usuario
        if(userExists) {
            return userExists;
        }

        const user = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(user);

        //se não existir, salvar no BD
        return user; 
    }
}

export { UsersService }