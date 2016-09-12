module.exports = function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");
    $stateProvider
	    .state('main', {
		    url: "/",
		    views: {
		    	'': {
		    		templateUrl: "./templates/main.html",
		    		controller: 'ctrlMain as ctrl'
		    	},
		    	'header': {
		    		templateUrl: "./templates/header.html"
		    	}
		    }
		    
	    })
	    .state('about', {
		    url: "/about",
		    views: {
		    	'': {
		    		templateUrl: "./templates/about.html",
		    		controller: 'ctrlAbout as ctrl'
		    	},
		    	'header': { 
		    		templateUrl: "./templates/header.html"
		    	}
		    }
		    
	    });
};