import express from "express";
import bearerTokenMiddleware from "./middlewares/bearer-authentication.middleware";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(statusRoute);
app.use(authorizationRoute);
app.use(bearerTokenMiddleware, usersRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Aplicação executando na porta ${PORT}`);
});
