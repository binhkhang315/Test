var courseService = angular.module('course',['ngCookies']);
courseService.service('CourseList',['$http','$q',function($http,$q){
    this.getCourses = function(){
      var deferred = $q.defer();
      return $http.get('/course/list').then(function(result) {
          var coursesList = result.data.course;
        //   for (var i = 0; i < coursesList.length; i++) {
        //       coursesList[i].trainerID = JSON.parse(coursesList[i].trainerID);
        //       coursesList[i].trainerIDJSON = coursesList[i].trainerID;
        //       var trainers = coursesList[i].trainerID[0].text;
        //       for (var j = 1; j < coursesList[i].trainerID.length; j++) {
        //           trainers = trainers + ' / ' + coursesList[i].trainerID[j].text;
        //       }
        //       coursesList[i].trainerID = trainers;
        //   }
          deferred.resolve(coursesList);
          return deferred.promise;
      });
    }
}]);

courseService.service('ToastService',['$mdToast',function($mdToast){
    this.showToast = function(msg){
      $mdToast.show(
        $mdToast.simple()
          .content(msg)
          .hideDelay(3000)
      );
    }
}]);
