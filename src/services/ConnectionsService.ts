import { Repository, getCustomRepository } from 'typeorm';
import { Connections } from '../entities/Connections';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionCreate{
    socket_id: string,
    user_id: string,
    admin_id?:string,
    id?:string
}

class ConnectionService{
    private connectionRepository: Repository<Connections>

    constructor(){
        this.connectionRepository = getCustomRepository(ConnectionsRepository)
    }

    async create({socket_id, user_id,admin_id, id}:IConnectionCreate){
        const connection = this.connectionRepository.create({
            socket_id, 
            user_id,
            admin_id, 
            id
        })

        await this.connectionRepository.save(connection)

        return connection
    }

    async findUserById(user_id:string){
        const connection = this.connectionRepository.findOne({
            user_id
        })

        return connection
    }
}

export { ConnectionService }