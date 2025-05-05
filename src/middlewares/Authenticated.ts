import { NextFunction, Request, RequestHandler, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
    sub: string;
}

export const Authenticated: RequestHandler = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        res.status(401).json({ error: "Token ausente" });
        return;
    }

    // Correção: O token JWT geralmente vem no formato "Bearer <token>"
    // então precisamos pegar a segunda parte (índice 1), não a primeira
    const [, token] = authToken.split(" ");

    if (!token) {
        res.status(401).json({ error: "Formato de token inválido" });
        return;
    }

    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string) as PayLoad;

        // Atribuir ao Request
        req.params.id = sub;

        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido" });
    }
}

