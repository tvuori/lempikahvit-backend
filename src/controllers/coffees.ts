import express, { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";
import fs from "fs";

import { Coffee } from "../models/coffee";

const dataPath = "./src/data/coffees.json";

let coffees: Coffee[] = [];

export const createCoffee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name: string = req.body.name;
  const weight: number = req.body.weight;
  const price: number = req.body.price;
  const roast: number = req.body.roast;

  if (!name || !weight || !price || !roast) {
    return res.status(400).json({ error: "Coffee incomplete" });
  }

  const newCoffee = new Coffee(uuid(), name, weight, price, roast);

  fs.readFile(dataPath, "utf8", (err, jsonString) => {
    if (err) {
      return next(err);
    }
    try {
      coffees = JSON.parse(jsonString);
    } catch (err) {
      return next(err);
    }

    coffees.push(newCoffee);

    fs.writeFile(dataPath, JSON.stringify(coffees), (err) => {
      if (err) {
        return next(err);
      }
      res
        .status(201)
        .json({ messsage: "Coffee added", addedCoffee: newCoffee });
    });
  });
};

export const getCoffees = (req: Request, res: Response, next: NextFunction) => {
  fs.readFile(dataPath, "utf8", (err, jsonString) => {
    if (err) {
      return next(err);
    }
    try {
      coffees = JSON.parse(jsonString);
    } catch (err) {
      return next(err);
    }
    res.json(coffees);
  });
};

export const deleteCoffee = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const coffeeId = req.params.id;

  fs.readFile(dataPath, "utf8", (err, jsonString) => {
    if (err) {
      return next(err);
    }
    try {
      coffees = JSON.parse(jsonString);
    } catch (err) {
      return next(err);
    }

    const index = coffees.findIndex((coffee) => coffee.id === coffeeId);

    if (index < 0) {
      return res.status(404).json({ error: "Coffee not found" });
    }

    coffees.splice(index, 1);

    fs.writeFile(dataPath, JSON.stringify(coffees), (err) => {
      if (err) {
        return next(err);
      }
      res.json({ messsage: "Coffee deleted" });
    });
  });
};
