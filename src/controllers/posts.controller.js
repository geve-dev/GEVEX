async function create(req, res, next) {
  try {
    res.send('ola mundo');
  } catch (e) { next(e); }
}

module.exports = { create };