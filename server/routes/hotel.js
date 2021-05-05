import express from "express";
import { requireSignin } from "../middleware/index";
import {create,hotels,image, sellerHotels} from '../controllers/hotel'
import  formidable from 'express-formidable'
const router = express.Router();

router.post("/create-hotel",requireSignin,formidable(),create);
router.get('/hotels',requireSignin,hotels);
router.get("/hotel/image/:hotelId",image);
router.get('/seller-hotels',requireSignin,sellerHotels);

module.exports = router;
