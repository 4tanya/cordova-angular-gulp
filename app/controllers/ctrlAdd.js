module.exports = function($scope) {
    var self = this;
    self.$scope = $scope;
	self.name = 'Minsk';
    self.close = function(isAction){
    	var data = isAction ? {name: self.name} : null;
        self.$scope.$close(data);
    }
}