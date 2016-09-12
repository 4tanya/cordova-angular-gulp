module.exports = function($http) {
    var self = this;
    self.$http = $http;

    self.api = 'http://api.openweathermap.org/data/2.5';
    self.appid = '408e514e8bebc5baf6a1c75f4e979456';

    self.getDataByCityName = function(obj){
    	var data = {
    		appid: self.appid,
    		q: obj.name,
            units: 'metric'
    	};
    	return self.$http({
            method: 'GET',
            url: self.api + '/weather',
            params: data
        });
    };
    self.getDataBySeveralIds = function(obj){
        var data = {
            appid: self.appid,
            id: obj.ids,
            units: 'metric'
        };
        return self.$http({
            method: 'GET',
            url: self.api + '/group',
            params: data
        });
    };
};