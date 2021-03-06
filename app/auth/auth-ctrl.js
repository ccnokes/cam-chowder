var passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy,
	User = require('../user/user-model'),
	router = require('express').Router(),
	logger = require('../config/logger'),
	errorLog = logger.errorLog,
	miscLog = logger.miscLog;

var authCtrl = exports;
authCtrl.router = router;

passport.use(new BasicStrategy(
	function(username, password, callback) {
		User.findOne({ username: username }, function (err, user) {
			if (err) { 
				return callback(err); 
			}

			// No user found with that username
			if (!user) { 
				errorLog.error('invalid user: ', user);
				return callback(null, false); 
			}

			// Make sure the password is correct
			user.verifyPassword(password, function(err, isMatch) {
				if (err) { 
					errorLog.error(err);
					return callback(err); 
				}

				// Password did not match
				if (!isMatch) { 
					errorLog.error('invalid password for: ', user);
					return callback(null, false); 
				}

				// Success
				miscLog.info(user.username + ' logged in');
				return callback(null, user);
			});
		});
	}
));

authCtrl.isAuthenticated = passport.authenticate('basic', { session : false });

router.route('/api/authenticate').post(authCtrl.isAuthenticated, function(req, res) {
	res.json({authenticated: true});
});


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