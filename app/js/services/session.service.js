module.exports = function ($http) {
  this.get = function () {
    $http.get('/api/session')
    .success(function (session) {
      mixpanel.track('Session Loaded', {
        page : document.title,
        session : session
      });
      mixpanel.identify(session.user._id);
      mixpanel.people.set({
        $first_name : session.user.firstname,
        $last_name : session.user.lastname,
        $email : session.user.email
      });
      return session;
  
    })
    .error(function () {
      $location.path('/login');
    });
  };

  this.logout = function () {
    $http.delete('/api/session')
      .success(function () {
        mixpanel.track('logout', {
          page : document.title
        });
      })
      .error(function (err, status) {
          console.log(status + ' : ' + err);
      });
  }
}
