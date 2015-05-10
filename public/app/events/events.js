angular.module('headcount.events', [])

.controller('EventsController', function ($scope, Links, $http, $window) {
  // Your code here


  //  populating data array with dummy event objects
  $scope.events = [];

  $scope.hasStripe = false;
  $scope.needInfo = false;
  $scope.newEvent = {
    title: 'Title goes here', 
    description: 'Description goes here', 
    expiration: 5, 
    thresholdPeople: 10,
    thresholdMoney: 100,
    image: ''
  };
  $scope.userList = [];
  $scope.inviteList = [];

  $scope.addInvite = function(user) {
    var index = $scope.userList.indexOf(user);
    console.log("INDEX!!! " + index);
    $scope.inviteList.push($scope.userList.splice(index, 1)[0]);
  };

  $scope.removeInvite = function(user) {
    var index = $scope.inviteList.indexOf(user);
    console.log("INDEX!!! " + index);
    $scope.userList.push($scope.inviteList.splice(index, 1)[0]);
  };

  $scope.fetchEvents = function () {
    console.log("INVOKING FETCH EVENTS");
    return $http({
      method: 'GET', 
      url: '/events-fetch'
    })
    .then(function(resp) {
      if (resp.data.length >= 1) {
        $scope.events = resp.data;
      }
      else {
        console.log("THERE ARE NO EVENTS RIGHT NOW");
      }
        console.log("INVOKING FETCH EVENTS" + JSON.stringify($scope.events));
    });
  };

  $scope.fetchEvents();


  $scope.fetchUsers = function () {
    console.log("FETCH USERS");
    return $http({
      method: 'GET', 
      url: '/users-fetch'
    })
    .then(function(resp) {
      console.log('resp!!!' + JSON.stringify(resp));
      $scope.userList = resp.data;
      console.log("$SCOPE.USERLIST" + $scope.userList);
    });
  };

  $scope.createEvent = function() {
    $scope.newEvent.invited = $scope.inviteList;
    console.log("NEW EVENT!!!" + JSON.stringify($scope.newEvent));
    return $http({
      method: 'POST',
      url: '/events-create',
      data: $scope.newEvent
    })
    .then(function(resp) {
      console.log(resp);
      $window.location.href = "/events";
    });
  };

  $scope.checkStripe = function(){
    var currentUser = sessionStorage.getItem('user');
    return $http({
      method: 'POST',
      url : '/users/checkUser',
      data : {'username': currentUser}
    })
    .then(function(resp){
      console.log('resp',resp);
      if (resp.data.hasStripeId === true){
        $scope.hasStripe = true;
      } else {
        $scope.needInfo = true;
      }
    });
  };

});
