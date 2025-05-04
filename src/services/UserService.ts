import { prisma } from "../libs/prisma";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface CreateUserProps {
    name: string;
    email: string;
    password: string;
}

// ---- FUNÇÃO PARA CRIAR USUÁRIO ---- //
export const CreateUserService =
    async ({ email, password, name }: CreateUserProps) => {

        // Verifica se o e-mail já existe
        const userAlreadyExists = await prisma.user.findFirst({
            where: { email }
        });

        if (userAlreadyExists) {
            throw new Error("E-mail já existe!");
        }

        // Criptografar a senha
        const passwordHash = await hash(password, 8);

        // Criar novo usuário no banco
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        // Retornar o usuário criado
        return newUser;
    };

// ---- FUNÇÃO PARA VERIFICAR SE USUÁRIO EXISTE ---- //
export const AuthUserService =
    async ({ email, password }: CreateUserProps) => {


        //---- Verificar se o email existe ---- //
        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            throw new Error("Usuário ou senha incorreta");
        }

        //---- Verificar se a senha está correta ---- //
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Usuário ou senha incorreta");
        }

        // GERAR TOKEN JWT
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
        }

        const token = sign(
            {
                email: user.email,
                name: user.name
            },
            jwtSecret,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        //---- Retornar o usuário ---- //
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            token
        };
    };