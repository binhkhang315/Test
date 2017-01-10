'use strict';
angular.module('users', []);

//Routers
myApp.config(function($stateProvider) {

    //Login
    $stateProvider.state('login', {
        templateUrl: 'partials/common/loginHeader.html',
        controller: 'loginController'
    });
    //Logout
    $stateProvider.state('logout', {
        url: "/logout",
        template: "<h3>Logging out...</h3>",
        controller: 'logoutController'
    });
    //userProfile
    $stateProvider.state('userProfile', {
        url:"/userProfile",
        templateUrl: 'partials/users/userProfile.html',
        controller:'userProfileCtrl'
    });
    //editUserProfile
    $stateProvider.state('editUserProfile', {
        url:"/editUserProfile",
        templateUrl: 'partials/users/editUserProfile.html',
        controller:'userProfileCtrl'
    });
});

//Factories
myApp.factory('userServices', ['$http', function($http) {

    var factoryDefinitions = {
        login: function(loginReq) {
            return $http.post('/users/login', loginReq).success(function(data) { return data; });
        },
        logout: function() {
            return $http.get('/users/logout').success(function(data) { return data; });
        },
        getUserProfile: function() {
            return $http.get('partials/users/mock/user.json').success(function(data) { return data; });
        },
        updateUserProfile: function(emailReq) {
            return $http.post('partials/common/mock/success.json', emailReq).success(function(data) { return data; });
        },
    }

    return factoryDefinitions;
}
]);

//Controllers
myApp.controller('loginController', ['$scope', 'userServices', '$location', '$rootScope', function($scope, userServices, $location, $rootScope) {

    //$scope.login = {"username":"qwe@gmail.com", "password": "qwe"};
    $scope.login = {};
    $scope.login.msg ='';

    $scope.doLogin = function() {
        if ($scope.loginForm.$valid) {
            userServices.login($scope.login).then(function(result){
                $scope.data = result;
                console.log("use info: ");
                console.log(result.data); //DEBUG
                $scope.login.msg = result.data.msg;
                if (result.data.success) {
                    window.sessionStorage["userInfo"] = JSON.stringify(result.data);
                    $rootScope.userInfo = JSON.parse(window.sessionStorage["userInfo"]);
                    // redirect to dashboard after login
                    $location.path("/dashboard");
                }
                //--show the pop up to infor login result
                var popup = document.getElementById("snackbar")
                popup.className = result.data.success? "success":"error";
                setTimeout(function(){ popup.className = "" }, 3000);
                //--end: show the pop
            });
        }
    };
}]);

myApp.controller('logoutController', ['$scope', 'userServices', '$location', '$rootScope', function($scope, userServices, $location, $rootScope) {
    userServices.logout().then(function(){
        console.log("----> logout success"); //DEBUG
        sessionStorage.clear();
        $rootScope.userInfo = false;
        // redirect ro home page after logout
        $location.path("/");
    })
}]);

//Get user information
myApp.controller('userProfileCtrl', ['$scope', 'userServices', '$location', '$rootScope', function($scope, userServices, $location, $rootScope) {
    $scope.userDetail = {};
    //$scope.userInfo.msg ='';
    userServices.getUserProfile().then(function(result){
        console.log (result.data);
        $scope.userDetail = result.data;
    });
$scope.editResultmesage ="";
    //update User Profile
    $scope.updateUserProfile = function() {
        userServices.updateUserProfile($scope.userDetail.email).then(function(result){
            $scope.userDetail = result.data;
            $location.path("/userProfile");
        });
    };

    $scope.cancel = function() {
        // reset user infor back to original
        $scope.editResultmesage = "some message.....";

        var popup = document.getElementById("snackbar")
        popup.className = true? "success":"error";
        setTimeout(function(){ popup.className = "" }, 3000);
        $location.path("/userProfile");
    }
}]);
