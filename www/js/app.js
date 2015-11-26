// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'LocalStorageModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
     

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html'
      }
    }
  })

  .state('app.post-status', {
    url: '/post-status',
    views: {
      'menuContent': {
        templateUrl: 'templates/post-status.html'
      }
    }
  })

  .state('app.post-photo', {
    url: '/post-photo',
    views: {
      'menuContent': {
        templateUrl: 'templates/post-photo.html'
      }
    }
  })

  .state('app.send-message', {
    url: '/send-message',
    views: {
      'menuContent': {
        templateUrl: 'templates/send-message.html'
      }
    }
  })

  .state('app.user-details', {
    url: '/user-details',
    views: {
      'menuContent': {
        templateUrl: 'templates/user-details.html'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
