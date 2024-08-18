import express from "express";

import SubscriptionService from "../service/index.js";

const router = express.Router();

router.post(
    "/subscribe", async (req, res) => {
        const URL = req.body.URL;

        const subscriptionService = new SubscriptionService();

        const { status, message, jobs } = await subscriptionService.subscribe(URL);

        res.status(status).json({ message, jobs });
    }
);

export default router;