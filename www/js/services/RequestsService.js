(function(){

	angular.module('starter')
	.service('RequestsService', ['$http', '$q', '$ionicLoading', '$timeout', '$ionicPopup', RequestsService]);

	function RequestsService($http, $q, $ionicLoading, $timeout, $ionicPopup){

		var base_url = 'YOUR-SERVER-URL';

		var me = this;
		
		me.timeout = {
			value: 20000,
			message: 'Please check your internet connection and re-launch the app'
		}; 

		function requestTimeout(deferred){

			var timer = $timeout(function(){
				
				$ionicLoading.hide();
				
				$ionicPopup.alert({
					'title': me.timeout.message
				});
				
				deferred.reject();

			}, me.timeout.value);

			return timer;

		};

		function sendData(data){

			var deferred = $q.defer();
			
			var timer = requestTimeout(deferred);

			$ionicLoading.show();

			$http.post(base_url + '/test', {'data' : data})
				.success(function(response){

					$timeout.cancel(timer);
					$ionicLoading.hide();

					$ionicPopup.alert({
						'title': response.message
					});

					deferred.resolve(response);
					
				})
				.error(function(data){
					deferred.reject();	
				});
			
			return deferred.promise;

		};
		

	    function uploadPhoto(photo_url, params){
	        
			var deferred = $q.defer();

			var options = new FileUploadOptions();
			options.fileKey = 'file';
			options.fileName = photo_url.substr(photo_url.lastIndexOf('/') + 1).split('?')[0];
			options.mimeType = 'image/jpeg';
			options.params = params;

			var ft = new FileTransfer();
			ft.upload(
				photo_url, base_url + '/upload', 
				function(result){
				  deferred.resolve(result);
				},
				function(err){
				  deferred.reject(err);
				}, 
				options
			);

			return deferred.promise;
	    }


		return {
			sendData: sendData,
			uploadPhoto: uploadPhoto
		};
	}
})();