require('angular');
require('angular-bootstrap');

angular.module('app', ['ui.bootstrap'])
	.service('serviceApi', require('./services/serviceApi'))
	.controller('ctrlMain', require('./controllers/ctrlMain'))
	.controller('ctrlAdd', require('./controllers/ctrlAdd'))
	.controller('ctrlEdit', require('./controllers/ctrlEdit'))