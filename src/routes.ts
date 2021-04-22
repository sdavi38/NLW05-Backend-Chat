import {Router} from 'express'
import {SettingsController} from './controller/SettingController'
import {UsersController} from './controller/UserController'

const routes = Router()
const settingsController = new SettingsController()
const usersController = new UsersController()

routes.post('/settings',settingsController.create)
routes.post('/users', usersController.create)
export {routes};