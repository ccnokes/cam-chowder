var passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy,
	User = require('../user/user-model');

var authCtrl = exports;

passport.use(new BasicStrategy(
	function(username, password, callback) {
		User.findOne({ username: username }, function (err, user) {
			if (err) { 
				return callback(err); 
			}

			// No user found with that username
			if (!user) { 
				return callback(null, false); 
			}

			// Make sure the password is correct
			user.verifyPassword(password, function(err, isMatch) {
				if (err) { 
					return callback(err); 
				}

				// Password did not match
				if (!isMatch) { 
					return callback(null, false); 
				}

				// Success
				return callback(null, user);
			});
		});
	}
));

authCtrl.isAuthenticated = passport.authenticate('basic', { session : false });


// authCtrl.getToken = function(req, res) {
// 	var creds = req.body;

// 	authCtrl.authenticate(creds)
// 	.then(
// 		function ok(creds) {
// 			//12 hour expiration
// 			var token = jwt.sign({user: 'admin'}, appConstants.authSecret, { expiresInMinutes: 720 });
// 			res.json({token: token});
// 		},
// 		function err(e) {
// 			res.status(401).end();
// 		}
// 	);
// };
//router.route('/authenticate').post(authCtrl.getToken);