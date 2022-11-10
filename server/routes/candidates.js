const router = require('express').Router();

const { getCandidates } = require('../handlers');
const handle = require('../handlers');
const auth = require('../middleware/auth');

router
  .route('/')
  .get(handle.showCandidates)
  .post(auth, handle.createCandidates);

router.get('/user', auth, handle.usersCandidates);

router
  .route('/:id')
  .get(handle.getCandidates)
  .post(auth, handle.vote)
  .delete(auth, handle.deleteCandidates);

module.exports = router;
