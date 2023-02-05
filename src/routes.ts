import { Request, Response, Router } from 'express';
import * as AuthController from './controllers/AuthController';
import * as UserController from './controllers/UserController';
import * as AdsController from './controllers/AdsController';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({ pong: true })
})

router.get('/states', UserController.getStates)

router.post('/user/signin', AuthController.signin)
router.post('/user/signup', AuthController.signup)

router.get('/user/me', UserController.info)
router.put('/user/me', UserController.editAction)

router.get('/categories', AdsController.getCategories)

router.post('/ad/add', AdsController.addAction)
router.get('ad/list', AdsController.getList)
router.get('ad/item' ,AdsController.getItem)
router.post('/add/:id', AdsController.editAction)

export default router;