package com.stocker.rest.DataClasses;

public class User {

	Integer userId;
	String userMessage = "";
	Boolean userValidated = false;
	String userFirstName = "";
	String userLastName= "";
	String userTitle= "";
	String password= "";
	String email = "";
	String sessionID = "";
	
	public User () {};
	
	public User(Integer userId, String userMessage, Boolean userValidated, String userFirstName,
			String userLastName, String userTitle, String password, String email,
			String sessionID) {
		this.userId = userId;
		this.userMessage = userMessage;
		this.userValidated = userValidated;
		this.userFirstName = userFirstName;
		this.userLastName = userLastName;
		this.userTitle = userTitle;
		this.password = password;
		this.email = email;
		this.sessionID = sessionID;
	}
	
	@Override
	public String toString() {
		return new StringBuffer("userId : ").append(this.userId)
				.append("userMessage : ").append(this.userMessage)
				.append("userValidated : ").append(this.userValidated)
				.append("userFirstName : ").append(this.userFirstName)
				.append("userLastName : ").append(this.userLastName)
				.append("userTitle : ").append(this.userTitle)
				.append("password : ").append(this.password)
				.append("email : ").append(this.email)
				.append("sessionID : ").append(this.sessionID)
			    .toString();	
	}	
	
	public String getSessionID() {
		return sessionID;
	}
	public void setSessionID(String sessionID) {
		this.sessionID = sessionID;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getUserMessage() {
		return userMessage;
	}
	public void setUserMessage(String userMessage) {
		this.userMessage = userMessage;
	}
	public Boolean getUserValidated() {
		return userValidated;
	}
	public void setUserValidated(Boolean userValidated) {
		this.userValidated = userValidated;
	}
	public String getUserFirstName() {
		return userFirstName;
	}
	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}
	public String getUserLastName() {
		return userLastName;
	}
	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}
	public String getUserTitle() {
		return userTitle;
	}
	public void setUserTitle(String userTitle) {
		this.userTitle = userTitle;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	
}
