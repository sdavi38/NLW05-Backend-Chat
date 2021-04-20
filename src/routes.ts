import {Router} from 'express'
import {SettingsController} from './controller/SettingController'


const routes = Router()
const settingsController = new SettingsController()

routes.post('/settings',settingsController.create)
export {routes};