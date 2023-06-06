var Userdb = require('../model/model');
const passport = require("passport");

// Register the user and save them into database
exports.register = async (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            req.flash("error_msg", "Content cannot be empty!");
            res.redirect("/register");
            return;
        }

        // Check if employeeid already exists
        const existingUser = await Userdb.findOne({ employeeid: req.body.employeeid });

        if (existingUser) {
            req.flash("error_msg", "Employee with this id already registered to database!");
            res.redirect("/register");
            return;
        }

        // Register new user
        const newUser = new Userdb({
            name: req.body.name,
            employeeid: req.body.employeeid,
            gender: req.body.gender,
            dob: req.body.dob,
            designation: req.body.designation,
            department: req.body.department,
            appointmentdate: req.body.appointmentdate,
        });

        // Save user to the database
        const user = await Userdb.register(newUser, req.body.password);

        req.flash("success_msg", "Registration successful!");
        res.redirect("/login");
    } catch (err) {
        console.log(err.message);
        req.flash("error_msg", "Error occurred while registering the user!");
        res.redirect("/register");
    }
};


// retrive all the users / retrive single user
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({
                    message : "User not found with this id "+id
                })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message : "Error finding the user with id: "+id
            })
        })

    } else {
        Userdb.find()
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Error occured while fetching the users information!"
            });
        });
    }
};

// update the particular user by id
exports.update = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({
                message : "Data to be update cannot be empty!"
            });
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindandModify: false})
    .then(data =>{
        if(!data){
            res.status(404).send({message : `Cannot update the user with di ${id}. User not found!`})
        } else {
            console.log(data)
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message : "Error updating the user!"})
    }) 
};

// delete the specified user using id
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot delete user with id: ${id}. Maybe id is wrong!`})
            } else {
                res.send({
                    message : "User deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message : `Could not delete the User with id: ${id}.`
            });
        });
};

// Login user
exports.login = async (req, res, next) => {
    try {
        const user = await Userdb.findOne({ employeeid: req.body.employeeid });
        if (!user) {
          req.flash("error_msg", "Invalid email or password. Try Again!!!");
          return res.redirect("/login");
        }
        
        if (user.role === "admin") {
          passport.authenticate("local", {
              successRedirect: "/admindash",
              failureRedirect: "/login",
              failureFlash: true,
            })(req, res, next);
        } else {
          passport.authenticate("local", {
            successRedirect: "/userdash",
            failureRedirect: "/login",
            failureFlash: true,
          })(req, res, next);
        }
    
      } catch (error) {
        req.flash("error_msg", "Error logging in user: " + error.message);
        res.redirect("/login");
      }
};

// Profile for user
exports.profile = async (req, res) => {
    try {
      const users = await Userdb.find().exec();
      const buser = req.user; // assuming you are using passport for authentication
      res.render("profile", {
        title: "User Profile",
        users: users.filter(user => user._id.equals(buser._id)), // filter users by id
        buser: buser // pass the logged in user object to the EJS file
      });
    } catch (err) {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/profile");
    }
  };
