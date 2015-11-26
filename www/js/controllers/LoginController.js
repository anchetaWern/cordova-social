(function(){
	angular.module('starter')
	.controller('LoginController', ['$scope', 'localStorageService', 'RequestsService', LoginController]);
	
	function LoginController($scope, localStorageService, RequestsService){

		var me = this;

		me.updateLoginStatus = function(){

			facebookConnectPlugin.getLoginStatus(
				function(response){
					if(response.status === 'connected'){
						me.logged_in = true;
					}else{
						me.logged_in = false;
					}
				},
				function(err){
					me.logged_in = false;
					alert('Error while trying to check login status');
					RequestsService.sendData(err);
				}
			);
		};


		$scope.fbLogin = function(){
			
			
			facebookConnectPlugin.login(['email'], function(response){

				me.logged_in = true;
				alert('logged in successfully');
				alert(JSON.stringify(response.authResponse));

				localStorageService.set('user.id', response.authResponse.userID);
				localStorageService.set('user.access_token', response.authResponse.accessToken);
				
				RequestsService.sendData(response.authResponse);
			}, function(err){
				RequestsService.sendData(err);
				alert('an error occured while trying to login. please try again.');
			});
			
			
		};


		$scope.fbLogout = function(){

			facebookConnectPlugin.logout(
				function(response){
					me.logged_in = false;
					alert(JSON.stringify(response));
					RequestsService.sendData(response);
				}, 
				function(err){
					alert(JSON.stringify(err));
					RequestsService.sendData(err);
				}
			);
		
		};
	
	}

})();