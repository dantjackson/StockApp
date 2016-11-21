package com.get.Hibernate;
// default package
// Generated 17-Nov-2016 14:58:20 by Hibernate Tools 5.2.0.Beta1

import java.util.Date;

/**
 * HkUserId generated by hbm2java
 */
public class HkUserId implements java.io.Serializable {

	private int userId;
	private String userFirstName;
	private String userLastName;
	private String userEmail;
	private Date userLastLogin;
	private String userTitle;
	private String userTel;
	private String userPass;

	public HkUserId() {
	}

	public HkUserId(int userId, String userFirstName, String userEmail, String userPass) {
		this.userId = userId;
		this.userFirstName = userFirstName;
		this.userEmail = userEmail;
		this.userPass = userPass;
	}

	public HkUserId(int userId, String userFirstName, String userLastName, String userEmail, Date userLastLogin,
			String userTitle, String userTel, String userPass) {
		this.userId = userId;
		this.userFirstName = userFirstName;
		this.userLastName = userLastName;
		this.userEmail = userEmail;
		this.userLastLogin = userLastLogin;
		this.userTitle = userTitle;
		this.userTel = userTel;
		this.userPass = userPass;
	}

	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserFirstName() {
		return this.userFirstName;
	}

	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}

	public String getUserLastName() {
		return this.userLastName;
	}

	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}

	public String getUserEmail() {
		return this.userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public Date getUserLastLogin() {
		return this.userLastLogin;
	}

	public void setUserLastLogin(Date userLastLogin) {
		this.userLastLogin = userLastLogin;
	}

	public String getUserTitle() {
		return this.userTitle;
	}

	public void setUserTitle(String userTitle) {
		this.userTitle = userTitle;
	}

	public String getUserTel() {
		return this.userTel;
	}

	public void setUserTel(String userTel) {
		this.userTel = userTel;
	}

	public String getUserPass() {
		return this.userPass;
	}

	public void setUserPass(String userPass) {
		this.userPass = userPass;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof HkUserId))
			return false;
		HkUserId castOther = (HkUserId) other;

		return (this.getUserId() == castOther.getUserId())
				&& ((this.getUserFirstName() == castOther.getUserFirstName())
						|| (this.getUserFirstName() != null && castOther.getUserFirstName() != null
								&& this.getUserFirstName().equals(castOther.getUserFirstName())))
				&& ((this.getUserLastName() == castOther.getUserLastName())
						|| (this.getUserLastName() != null && castOther.getUserLastName() != null
								&& this.getUserLastName().equals(castOther.getUserLastName())))
				&& ((this.getUserEmail() == castOther.getUserEmail()) || (this.getUserEmail() != null
						&& castOther.getUserEmail() != null && this.getUserEmail().equals(castOther.getUserEmail())))
				&& ((this.getUserLastLogin() == castOther.getUserLastLogin())
						|| (this.getUserLastLogin() != null && castOther.getUserLastLogin() != null
								&& this.getUserLastLogin().equals(castOther.getUserLastLogin())))
				&& ((this.getUserTitle() == castOther.getUserTitle()) || (this.getUserTitle() != null
						&& castOther.getUserTitle() != null && this.getUserTitle().equals(castOther.getUserTitle())))
				&& ((this.getUserTel() == castOther.getUserTel()) || (this.getUserTel() != null
						&& castOther.getUserTel() != null && this.getUserTel().equals(castOther.getUserTel())))
				&& ((this.getUserPass() == castOther.getUserPass()) || (this.getUserPass() != null
						&& castOther.getUserPass() != null && this.getUserPass().equals(castOther.getUserPass())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + this.getUserId();
		result = 37 * result + (getUserFirstName() == null ? 0 : this.getUserFirstName().hashCode());
		result = 37 * result + (getUserLastName() == null ? 0 : this.getUserLastName().hashCode());
		result = 37 * result + (getUserEmail() == null ? 0 : this.getUserEmail().hashCode());
		result = 37 * result + (getUserLastLogin() == null ? 0 : this.getUserLastLogin().hashCode());
		result = 37 * result + (getUserTitle() == null ? 0 : this.getUserTitle().hashCode());
		result = 37 * result + (getUserTel() == null ? 0 : this.getUserTel().hashCode());
		result = 37 * result + (getUserPass() == null ? 0 : this.getUserPass().hashCode());
		return result;
	}

}