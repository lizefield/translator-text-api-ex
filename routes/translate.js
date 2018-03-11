const express = require('express');
const router = express.Router();
const http = require('http');
const translator = require('../modules/translator');

/* GET translate listing. */
router.get('/:word/:lang', async (req, res, next) => {
  try {
    const result = await translator.translate(req.params.word, req.params.lang);
    res.status(200);
    res.json({ result: result });
  } catch(e) {
    res.status(500);
    res.json({ message: e.message });
  }
});

/* POST translate listing. */
router.post('/', async (req, res, next) => {
  try {
    const result = await translator.translate(req.body.word, req.body.to);
    res.status(200);
    res.json({ result: result });
  } catch(e) {
    res.status(500);
    res.json({ message: e.message });
  }
});

module.exports = router;
