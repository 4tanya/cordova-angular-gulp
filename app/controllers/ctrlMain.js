module.exports = function($scope, $modal, serviceApi) {
	var self = this;
	self.$scope = $scope;
	self.$modal = $modal;
	self.serviceApi = serviceApi;
	self.data = [];

	self.getDataByCityName = function(data){
		return self.serviceApi.getDataByCityName(data);
	}
	self.getDataByCoords = function(pos){
		var lat = pos.coords.latitude,
			lon = pos.coords.longitude;
		return self.serviceApi.getDataByCoords({lat:lat, lon:lon});
	}
	self.getDataBySeveralIds = function(data){
		return self.serviceApi.getDataBySeveralIds(data);
	}
	self.getItemByPosition = function(pos){
		return self.getDataByCoords().then(
			res => {
        		self.setItem(res.data, res.data);
        		self.getAllItems();
        	},
        	error => {
        	}
		);
	}
	self.getCurrentTime = function(){
		var now = new Date();
		return formatNum(now.getHours()) +':'+ formatNum(now.getMinutes()) +':'+ formatNum(now.getSeconds());
	}
	self.getCurrentDate = function(){
		var now = new Date();
		return formatNum(now.getDate()) +'/'+ formatNum(now.getMonth()+1) +'/'+ now.getFullYear();
	}
	self.getAllItems = function(){
		var data = [];
	    for (var i=0; i<localStorage.length; i++) {  
	        var key = localStorage.key(i),  
	        	value = localStorage.getItem(key),
	        	item = {name: key, data: JSON.parse(value)};
	        data.push(item);
	    } self.data = data;
	}
	self.updateAllItems = function(){
		clearInterval(self.timerUpdate);
		self.isUpdating = true;
		var ids = [];
		for (var i=0; i<self.data.length; i++){
			ids.push(self.data[i].data.id);
		}
		self.getDataBySeveralIds({ids: ids.join(',')}).then(
			res=>{
				var arr = res.data.list;
				for (var i=0; i<arr.length; i++){
					self.setItem(arr[i], arr[i]);
				}
				self.getAllItems();
				self.setTimerUpdate();
				self.isUpdating = false;
			},
			error=>{
			}
		);
		
	}
	self.setItem = function(item, data){
		data.updationDate = self.getCurrentDate();
		data.updated = self.getCurrentTime();
		data.created = (item.data && item.data.created) ? item.data.created : self.getCurrentTime();
		localStorage.setItem(item.name, JSON.stringify(data));
	}
	self.updateItem = function(item){
		return self.getDataByCityName(item).then(
        	res => {
        		self.setItem(item, res.data);
        		self.getAllItems();	
        	},
        	error => {
        	}
        );
	}
	self.editItem = function(item) {
		self.$modal.open({
			templateUrl:'../templates/modal.html',
            controller:'ctrlEdit as ctrl',
            resolve: {
				item: function() {
				    return item;
				},
				isEditMode: function(){
					return true;
				}
			}
        }).result.then((res) => {
        	if (!!!res) return;
        	localStorage.removeItem(res.item.name);
            self.updateItem(res.data);
        });
	}
	self.deleteItem = function(item) {
		if (!confirm("Do you really want to delete " + item.name + "?")) return;
		localStorage.removeItem(item.name);
		self.getAllItems();
	}
	self.addItem = function(){
		self.$modal.open({
			templateUrl:'../templates/modal.html',
            controller:'ctrlAdd as ctrl'
        }).result.then((data) => {
        	if (!!!data) return;
            self.updateItem(data);
        });
	}
	self.fillTableWithData = function(){
		if (navigator.geolocation && confirm("Do you agree identify your geoposition?"))
			navigator.geolocation.getCurrentPosition(self.getItemByPosition, self.getAllItems, 
				{maximumAge:60000, timeout:10000, enableHighAccuracy:false});
		return self.getAllItems();
	}
	self.setTimerUpdate = function(){
		self.timerUpdate = setInterval(function(){
		  self.updateAllItems();
		}, 300000);
	}
	self.init = function(){
		self.fillTableWithData();
		self.setTimerUpdate();
		self.isUpdating = false;
	}
	
	function formatNum(num){
		if (num<10) return '0'+num;
		return num;
	}
}