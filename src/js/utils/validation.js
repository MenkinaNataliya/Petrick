var app = app || {};
app.utils = app.utils || {};

app.utils.isValidEmail = function(email) {
  var re = /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]){0,}@[a-zA-Z0-9-]+\.([a-zA-Z]{1,6}\.)?[a-zA-Z]{2,6}$/g;
  return re.test(email);
};

app.utils.isValidName = function(name) {
    var re = /^[а-яёА-ЯЁ]*$/g;
    return re.test(name);
};

app.utils.isValidPhone = function(phone){
    var re = /^\+[7]\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}/g;
    return re.test(phone);
};