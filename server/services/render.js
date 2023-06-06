const axios = require('axios');

exports.homeRoutes = (req, res) => {
    res.render("index")
};

exports.addUser = (req, res) => {
    res.render("register");
};

exports.admindash = (req, res) => {
    axios.get('http://localhost:3000/api/users')
      .then(function(response) {
        const users = response.data.filter(user => user.role !== 'admin');
        res.render('admindash', { users });
      })
      .catch(err => {
        res.send(err);
      });
};
  

exports.userdash = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('userdash', {
                users : response.data
            })
        })
        .catch(err => {
            res.send(err)
        })
};

exports.profile = (req, res) => {
    res.render("profile")
};

exports.updateUser = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render('update_user', {
                user : userdata.data
            })
        }) 
        .catch(err => {
            res.send(err);
        })
};

exports.login = async (req, res, next) => {
    res.render("login")
};
  