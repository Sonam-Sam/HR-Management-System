const express = require("express");
const router = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

// Check is user is authenticated
function isAuthenticatedUser(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please Login first to access this page.");
    res.redirect("/login");
}
  
// Middleware for super admin
function requireSuperAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    req.flash("error_msg", "You are unauthorized to access this page.");
    res.redirect("/login");
  }
}

/**
 *  @description Root Route
 *  @method GET /
 */
router.get('/', services.homeRoutes);

/**
 *  @description register
 *  @method GET /register
 */
router.get('/register', services.addUser);

/**
 *  @description for login user
 *  @method GET /login
 */
router.get('/login', services.login);

// To log out
router.get("/logout", isAuthenticatedUser, function (req, res) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "You have been successfully logged out!");
    res.redirect("/");
  });
});


/**
 *  @description for admin dashboard
 *  @method GET /admindash
 */
router.get('/admindash', isAuthenticatedUser && requireSuperAdmin, services.admindash);

/**
 *  @description for user dashboard
 *  @method GET /userdash
 */
router.get('/userdash', isAuthenticatedUser, services.userdash);

/**
 *  @description for update user
 *  @method GET /update-user
 */
router.get('/update_user', isAuthenticatedUser && requireSuperAdmin, services.updateUser);

// Profile for user
router.get("/profile", isAuthenticatedUser, controller.profile);

// Login
router.post('/login', controller.login);

// Delete User
router.post('/delete/:id', isAuthenticatedUser, controller.delete);

// Update/Edit User
router.post('/update_user/:id', isAuthenticatedUser && requireSuperAdmin, controller.update_user);


// API
router.post('/api/users', controller.register);
router.get('/api/users', controller.find);
router.put('/api/users/:id', isAuthenticatedUser, controller.update);
router.delete('/api/users/:id', isAuthenticatedUser, controller.delete);

module.exports = router;