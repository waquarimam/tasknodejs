import express from "express";
import customerController from "./customer.controller";
import multer from "multer";
import { upload } from "../../middlewares/uploadfileDO";

export const customerRouter = express.Router();

customerRouter.post("/", customerController.task);
