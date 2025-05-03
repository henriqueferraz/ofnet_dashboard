import { Router } from "express";
//import multer from "multer";

import * as pingController from "./controllers/ping";


//import { isAuthenticated } from "./middlewares/isAuthenticated";
//import uploadConfig from "./config/multer";

export const router = Router();
//const upload = multer(uploadConfig.upload("./public/uploads"));

//---- ROTAS NÃO PROTEGIDAS ----//
//---- ROTAS DE TESTE ----//
router.get('/ping', pingController.ping);