module.exports = function($scope, item, isEditMode) {
    var self = this;
    self.$scope = $scope;
    self.name = item.name;
    self.item = item;
    self.isEditMode = isEditMode;
    self.close = function(isAction){
    	var data = isAction ? {item: item, data: {name: self.name}} : null;
        self.$scope.$close(data);
    }
}