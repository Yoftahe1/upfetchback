import expressLoader from "./express.js";
import socket from '../socket/index.js';

export default async ({ expressApp }) => {
    await expressLoader({ app: expressApp });
    socket()
};