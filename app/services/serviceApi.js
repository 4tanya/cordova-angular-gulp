module.exports = function($http) {
    var self = this;
    self.$http = $http;

    self.api = 'http://api.openweathermap.org/data/2.5';
    self.appid = '408e514e8bebc5baf6a1c75f4e979456';

    self.getDataByCityName = function(data){
    	var data = {
    		appid: self.appid,
    		q: data.name,
            units: 'metric'
    	}
    	return self.$http({
            method: 'GET',
            url: self.api + '/weather',
            params: data
        });
    };
    self.getDataByCoords = function(data){
        var data = {
            appid: self.appid,
            lon: data.lon,
            lat: data.lat,
            units: 'metric'
        }
        return self.$http({
            method: 'GET',
            url: self.api + '/weather',
            params: data
        });
    };
    self.getDataBySeveralIds = function(data){
        var data = {
            appid: self.appid,
            id: data.ids,
            units: 'metric'
        }
        return self.$http({
            method: 'GET',
            url: self.api + '/group',
            params: data
        });
    };
}