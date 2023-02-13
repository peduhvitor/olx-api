import { Request, Response, Router } from 'express';
import * as AuthController from './controllers/AuthController';
import * as UserController from './controllers/UserController';
import * as AdsController from './controllers/AdsController';
import { privateRoute } from './middlewares/Auth';
import * as AuthValidator from './validators/AuthValidator';
import * as UserValidator from './validators/UserValidator';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({ pong: true })
})

router.get('/states', UserController.getStates)

router.post('/user/signin', AuthValidator.signin, AuthController.signin)
router.post('/user/signup', AuthValidator.signup, AuthController.signup)

router.get('/user/me', privateRoute, UserController.info)
router.put('/user/me', UserValidator.editAction, privateRoute, UserController.editAction)

router.get('/categories', AdsController.getCategories)

router.post('/ad/add', privateRoute, AdsController.addAction)
router.get('ad/list', AdsController.getList)
router.get('ad/item', AdsController.getItem)
router.post('/add/:id', privateRoute, AdsController.editAction)

export default router;