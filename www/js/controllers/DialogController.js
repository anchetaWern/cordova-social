(function(){
	angular.module('starter')
	.controller('DialogController', ['$scope', 'RequestsService', 'CameraService', DialogController]);
	
	function DialogController($scope, RequestsService, CameraService){
		
		var me = this;
		me.base_uploads_url = 'YOUR-SERVER-URL/uploads/';

		$scope.postStatus = function(){

			var dialog_options = {
				method: 'feed',
				link: me.url,
				caption: me.caption
			};

			facebookConnectPlugin.showDialog(dialog_options, function(response){
				alert('posted!');
				RequestsService.sendData(response);
			}, function(err){
				RequestsService.sendData(err);
				alert('something went wrong while trying to post');
			});

		};


		$scope.capturePhoto = function(){

			CameraService.getPicture().then(function(imageURI) {

				alert(imageURI);
				me.photo = imageURI;

			}, function(err) {
			  alert(err);
			});

		};


		$scope.postPhoto = function(){

			var dialog_options = {
				method: "feed",
				name: me.caption,
				message: me.caption,    
				caption: me.caption,
				description: me.caption  
			};
		
			var photo_data = {
				'caption': me.caption
			};

			RequestsService.uploadPhoto(me.photo, photo_data).then(function(response){

				var res = JSON.parse(response.response);
			
				dialog_options.picture = me.base_uploads_url + res.image_url;

				facebookConnectPlugin.showDialog(dialog_options, 
				    function (response) {
				    	RequestsService.sendData(response);
				    	alert(JSON.stringify(response)) 
				    },
				    function (response) { 
				    	RequestsService.sendData(response);
				    	alert(JSON.stringify(response)) 
				    }
				);
				
			}, function(response){
				alert(JSON.stringify(response));
			});

		};


		$scope.sendMessage = function(){
			
			facebookConnectPlugin.showDialog( 
			    {
			        method: "send",
			        link: me.url
			    }, 
			    function (response) { 
			    	RequestsService.sendData(response);
			    	alert(JSON.stringify(response)) 
			    },
			    function (response) { 
			    	RequestsService.sendData(response);
			    	alert(JSON.stringify(response)) 
			    }
			);

		};

	
	}

})();