(function () {

  if (!('PasswordCredential' in window)) {
    function PasswordCredential(data) {
      this.data = data;
    }
    
    PasswordCredential.prototype.send = function () {
      //TO implement
    };
    window.PasswordCredential = PasswordCredential;
  }


  var form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
    var ajax = new XMLHttpRequest();
    var username = this.querySelector('[name=username]').value;
    var password = this.querySelector('[name=password]').value;
    var params;
    var handler = function (progress) {
      var credentials = new PasswordCredential({
        id: username,
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
    window.navigator.credentials.store(credentials);
  }
  alert('Logged in: ' + responseText);
}
function ajaxFail(progress, responseText) {
  alert('Log in fail: ' + responseText);
}


}());
