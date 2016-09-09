require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');

angular.module('app', ['ui.router', 'ui.bootstrap'])
	.service('serviceApi', require('./services/serviceApi'))
	.controller('ctrlMain', require('./controllers/ctrlMain'))
	.controller('ctrlAbout', require('./controllers/ctrlAbout'))
	.controller('ctrlAdd', require('./controllers/ctrlAdd'))
	.controller('ctrlEdit', require('./controllers/ctrlEdit'))
	.config(require('./config/routes'));