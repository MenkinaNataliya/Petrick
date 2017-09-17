var app = app || {};
app.utils = app.utils || {};

app.utils.serverErrorText = 'Ошибка доступа к серверу, попробуйте позже';
app.utils.serverError = function () {
    alert(app.utils.serverErrorText);
};
