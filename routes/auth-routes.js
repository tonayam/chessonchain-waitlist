const router = require(`express`).Router();
const { loginAdmin, registerAdmin } = require(`../controllers/auth-controller`);

router.post(`/register`, registerAdmin);
router.post(`/login`, loginAdmin);

module.exports = router;
