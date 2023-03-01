const cloudinary = require("cloudinary");
const router = require("express").Router();
require("dotenv").config();

cloudinary.config({
  cloud_name: "dmwjcjyfb",
  api_key: "187578826246188",
  api_secret: "o9GfM4-ZTeNeOoFrPAExZspZ7Ys",
});

router.delete("/:public_id", async (req, res) => {
  const { public_id } = req.params;
  try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
