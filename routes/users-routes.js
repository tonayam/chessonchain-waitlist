const router = require(`express`).Router();
const {
  deleteUser,
  getAllUsers,
  getSingleUser,
  joinWaitlist,
} = require(`../controllers/users-controller`);
const {
  authorizeRoles,
  authenticateUser,
} = require('../middlewares/authentication');

router.post(`/join-waitlist`, joinWaitlist);
router.get(`/`, authenticateUser, authorizeRoles(`admin`), getAllUsers);

router
  .route(`/:id`)
  .get(authenticateUser, authorizeRoles(`admin`), getSingleUser)
  .delete(authenticateUser, authorizeRoles(`admin`), deleteUser);

module.exports = router;
