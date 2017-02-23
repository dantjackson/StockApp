"use strict";
var User = (function () {
    function User(email, password, userMessage, userId, sessionID, userValidated, userFirstName, userLastName, userTitle) {
        this.email = email;
        this.password = password;
        this.userMessage = userMessage;
        this.userId = userId;
        this.sessionID = sessionID;
        this.userValidated = userValidated;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userTitle = userTitle;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map