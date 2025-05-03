import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
//import helmet from "helmet";
import path from "path";
import { router } from "./routes";

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

//app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(router);
app.use(
    "/uploads",
    express.static(path.resolve(__dirname, "..", "public", "uploads"))
);

// Middleware de erro
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(400).json({ error: err.message });
    } else {
        res.status(500).json({ status: "error", message: "Erro interno do servidor!" });
    }
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}/`);
});