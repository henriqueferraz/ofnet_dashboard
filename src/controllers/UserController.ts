import { RequestHandler } from "express";
import { AuthUserService, CreateUserService } from "../services/UserService";
import { AuthUserSchema, CreateUserSchema } from "../schemas/UserSchema";

// ---- FUNÇÃO PARA CRIAR USUÁRIO ---- //
export const CreateUserController: RequestHandler = async (req, res) => {

    //---- Valida os dados do usuário no zod ---- //
    const data = CreateUserSchema.safeParse(req.body);

    //---- Se os dados não forem válidos, retorna erro ---- //
    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    //---- Cria o usuário ---- //
    const user = await CreateUserService({
        name: data.data.name as string,
        email: data.data.email,
        password: data.data.password,
    });

    //---- Se o usuário não for criado, retorna erro ---- //
    if (!user) {
        res.json({ error: "Erro ao criar usuário" });
        return;
    }

    //---- Retorna o usuário criado ---- //
    res.json(user);
};

// ---- FUNÇÃO PARA VERIFICAR SE USUÁRIO EXISTE ---- //
export const AuthUserController: RequestHandler = async (req, res) => {

    //---- Valida os dados do usuário no zod ---- //
    const data = AuthUserSchema.safeParse(req.body);

    //---- Se os dados não forem válidos, retorna erro ---- //
    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors });
        return;
    }

    //---- Verifica se o usuário existe ---- //
    const user = await AuthUserService({
        name: data.data.name as string,
        email: data.data.email,
        password: data.data.password,
    });

    res.json(user);
};