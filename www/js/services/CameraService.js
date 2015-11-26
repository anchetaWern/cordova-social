(function(){

  angular.module('starter')
  .service('CameraService', ['$q', CameraService]);

  function CameraService($q){

    var me = this;
    
    me.options = {
      quality: 80,
      targetWidth: 300,
      targetHeight: 300,
      correctOrientation: true
    };
    
    function getPicture(){

        var q = $q.defer();

        navigator.camera.getPicture(
          function(result){
            q.resolve(result);
          }, 
          function(err){
            q.reject(err);
          }, 
          me.options
        );

        return q.promise;
      }

    return {
      getPicture: getPicture
    }
  }

})();
