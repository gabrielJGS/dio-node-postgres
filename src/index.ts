import express from "express";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(statusRoute);
app.use(usersRoute);

app.listen(PORT, () => {
  console.log(`Aplicação executando na porta ${PORT}`);
});
