import express from "express";

import loader from "./loader/index.js";

async function startServer() {
  const app = express();

  await loader({ expressApp: app });

  app.listen(3333, () => {
    console.log(`Your server is ready !`);
  });
}

startServer(); 