import { Router } from "express";
//import multer from "multer";

import * as pingController from "./controllers/ping";
import * as UserController from "./controllers/UserController";
import { Authenticated } from "./middlewares/Authenticated";


//import { isAuthenticated } from "./middlewares/isAuthenticated";
//import uploadConfig from "./config/multer";

export const router = Router();
//const upload = multer(uploadConfig.upload("./public/uploads"));

//---- ROTAS NÃO PROTEGIDAS ----//
//---- ROTAS DE TESTE ----//
router.get('/ping', pingController.ping);

//---- ROTAS DE USUÁRIO ----//
router.post('/user', UserController.CreateUserController);

router.post('/auth', UserController.AuthUserController);

//---- ROTAS PROTEGIDAS ----//
//---- ROTAS PARA LISTAR USUÁRIO ----//
router.get('/user', Authenticated, UserController.DetailUserController);