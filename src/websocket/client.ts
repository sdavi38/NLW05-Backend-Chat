import { io } from "../http"
import { ConnectionService } from "../services/ConnectionsService"
import { MessagesService } from "../services/MessagesServices";
import { UserService } from "../services/UsersService";

interface IParams{
    text:string,
    email:string
}

io.on("connect", (socket)=>{
    const connectionsService = new ConnectionService()
    const usersService = new UserService()
    const messageService = new MessagesService

    let user_id = null 
     
    socket.on("client_first_access", async(params)=>{
        const socket_id = socket.id
        const { text, email } = params as IParams

        const userExists = await usersService.findByEmail(email);

        if(!userExists){
            const user = await usersService.create(email)

            await connectionsService.create({
                socket_id,
                user_id: user.id
            })
            
            user_id = user.id 

        }else{
            user_id = userExists.id 
            //Salvar a conexão no banco de dados
            const connection = await connectionsService.findUserById(userExists.id);

            if(!connection){
                await connectionsService.create({
                    socket_id: socket_id,
                    user_id: userExists.id,
                    
                })    
            }else{
                connection.socket_id = socket_id
                await connectionsService.create(connection)
            }
            
            
        }

        await messageService.create({
            text,
            user_id
        })
        console.log(params)

        
    })
})