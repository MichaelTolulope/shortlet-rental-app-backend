import express from "express";
import {registerUser} from "../controllers/auth.controller.js";
import {login} from "../controllers/auth.controller.js";
import {logout} from "../controllers/auth.controller.js";

const route = express.Router();

route.post("/register",registerUser);
route.post("/login", login);
route.post("/logout", logout);


export default route;