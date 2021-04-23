import express from "express";
import { requireSignin } from "../middleware/index";
import {createConnectAccount} from '../controllers/stripe';

const router = express.Router();

router.post("/create-connect-account",requireSignin, createConnectAccount);
        
module.exports = router;
