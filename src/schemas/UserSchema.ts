import { z } from "zod";

//---- SCHEMA PARA VALIDAR OS DADOS DO USUÁRIO ---- //
export const CreateUserSchema = z.object({
    name: z.string({ message: "Campo nome é obrigatório" }).min(2, { message: "Nome deve ter no mínimo 2 caracteres" }).optional(),
    email: z.string({ message: "Campo email é obrigatório" }).email({ message: "email inválido" }),
    password: z.string({ message: "Campo senha é obrigatório" }).min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
    id: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

//---- SCHEMA PARA VALIDAR OS DADOS DO USUÁRIO ---- //
export const AuthUserSchema = z.object({
    name: z.string({ message: "Campo nome é obrigatório" }).min(2, { message: "Nome deve ter no mínimo 2 caracteres" }).optional(),
    email: z.string({ message: "Campo email é obrigatório" }).email({ message: "email inválido" }),
    password: z.string({ message: "Campo senha é obrigatório" }).min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
    id: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});