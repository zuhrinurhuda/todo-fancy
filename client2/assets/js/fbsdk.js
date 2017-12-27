window.fbAsyncInit = function() {
  FB.init({
    appId      : '1826498564044116',
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  // FB.getLoginStatus(function(response) {
    // console.log(response);
    // console.log(response.authResponse.userID);
    // statusChangeCallback(response)
  // });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// function statusChangeCallback(response) {
  // if (response.status === 'connected') {
    // localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
    // getTimelineFB()
    // $('#login-btn').fadeOut('slow')
    // $('#timeline-wrapper').fadeIn('slow')
  // }
// }

function FBLogin() {
  FB.login(function(response) {
    // console.log('fblogin response ',response)
    if(response.authResponse) {
      localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
      axios.post('http://localhost:3000/users', response.authResponse)
      .then(response => {
        console.log(response);
        location.reload()
      })
      .catch(err => console.log(error))
    } else {
      console.log('User cancelled login or did not fully authorize.')
    }
  }, {scope: 'public_profile,email'})
}
