(function () {

  if (!('LocalCredential' in window)) {
    function LocalCredential(data) {
      this.data = data;
    }
    
    LocalCredential.prototype.send = function () {
      //TO implement
    };
    window.LocalCredential = LocalCredential;
  }


  var form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
    var ajax = new XMLHttpRequest();
    var username = this.querySelector('[name=username]').value;
    var password = this.querySelector('[name=password]').value;
    var params;
    var handler = function (progress) {
      var credentials = new LocalCredential({
        username: username,
        password: password
      });
      ajaxHandle.call(this, progress, credentials);
    };
    e.preventDefault();

    ajax.onload = handler;
    ajax.onerror = handler;
    ajax.open("post", this.action, true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    params = 'username=' + username + '&password=' + password;
    ajax.send(params);

    return false;
  });

function ajaxHandle(progress, credentials) {
  var responseText = this.responseText;
  if (this.status >= 200 && this.status < 300) {
    ajaxSuccess(progress, responseText, credentials);
    return;
  }
  ajaxFail(progress, responseText, credentials);
}
  
function ajaxSuccess(progress, responseText, credentials) {
  if ('credentials' in window.navigator) {
    window.navigator.credentials.send(credentials);
  }
  alert('Logged in: ' + responseText);
}
function ajaxFail(progress, responseText) {
  alert('Log in fail: ' + responseText);
}


}());
