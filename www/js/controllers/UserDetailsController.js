(function(){
	angular.module('starter')
	.controller('UserDetailsController', ['$scope', 'localStorageService', 'RequestsService', UserDetailsController]);
	
	function UserDetailsController($scope, localStorageService, RequestsService){

		var me = this;

		$scope.user = null;
		
		me.getUserInfo = function(){

    		var user_id = localStorageService.get('user.id');
    		
			facebookConnectPlugin.api(
				user_id + "/?fields=id,email,first_name,last_name,gender,age_range", 
				['public_profile', 'email'],
			    function (response) {
			        alert(JSON.stringify(response));
			        RequestsService.sendData(response);
			        $scope.user = response;
			    },
			    function (error) {
			        alert("Failed: " + error);
				}
			);	
			

		};

	}

})();