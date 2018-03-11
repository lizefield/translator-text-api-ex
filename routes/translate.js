const express = require('express');
const router = express.Router();
const http = require('http');
const translator = require('../modules/translator');

/* GET translate listing. */
router.get('/:word/:lang', async (req, res, next) => {
  try {
    const result = await translator.translate(req.params.word, req.params.lang);
    res.json({ status: 200, result: result });
  } catch(e) {
    res.json({ status: 500, message: e.message });
  }
});

/* POST translate listing. */
router.post('/', async (req, res, next) => {
  try {
    const result = await translator.translate(req.body.word, req.body.to);
    res.json({ status: 200, result: result });
  } catch(e) {
    res.json({ status: 500, message: e.message });
  }
});

module.exports = router;
