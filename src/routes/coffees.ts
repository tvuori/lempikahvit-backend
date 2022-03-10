import { Router } from "express";

import { createCoffee, getCoffees, deleteCoffee } from "../controllers/coffees";

const router = Router();

router.post("/", createCoffee);

router.get("/", getCoffees);

router.delete("/:id", deleteCoffee);

export default router;
