import { Router } from "express";
import { getPong, getAllUrls, getUrl, getRedirectUrl, createShortUrl, deleteUrl, updateUrl } from "../controllers/shortener.controllers.js";

const router = Router();

router.get("/ping", getPong)

router.get("/urls", getAllUrls)

router.get("/urls/:short_url", getUrl)

router.get('/urls/redirect/:short_url', getRedirectUrl)

router.post("/urls", createShortUrl)

router.delete("/urls/:short_url", deleteUrl)

router.patch("/urls/:short_url", updateUrl)

export default router;