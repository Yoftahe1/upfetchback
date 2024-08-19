import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import router from "../api/index.js";

export default async ({ app }) => {
    app.use(cors({
        origin: '*', 
        methods: ['GET', 'POST'],
    }));
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/", router);

    return app;
};