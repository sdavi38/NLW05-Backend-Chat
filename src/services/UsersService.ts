import { Repository,getCustomRepository } from 'typeorm';
import { Users } from '../entities/Users';
import { UsersRepository } from '../repositories/UsersRepository';


class UserService{

    private userRepository: Repository<Users>

    constructor(){
        this.userRepository = getCustomRepository(UsersRepository)
    }

    async create(email:string){

        //Verificar se o usuário existe
        const userExists  = await this.userRepository.findOne({
            email
        })

        //Se existir retornar user 
        if(userExists){
            return userExists
        }

        //Se não existir, salvar no BD
        
        const user = this.userRepository.create({
            email
        })

        await this.userRepository.save(user)

        return user
    }

    async findByEmail(email: string){
        const userExists  = await this.userRepository.findOne({
            email
        })
        
        if(userExists){
            return userExists
        }
    }

}

export { UserService }