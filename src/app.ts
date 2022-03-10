import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import coffeeRoutes from "./routes/coffees";

const app: Application = express();
const port: number = 3001;

app.use(cors());
app.use(express.json());

app.use("/coffees", coffeeRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3001, () => console.log(`Server listening on port ${port}`));
