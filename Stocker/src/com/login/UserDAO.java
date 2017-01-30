package com.login;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import sun.misc.BASE64Encoder;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

import com.stocker.rest.SqlMySQLConn;
import com.stocker.rest.DataClasses.User;

import java.sql.*;

@SuppressWarnings("restriction")
public class UserDAO {
	
	private Random random = new SecureRandom();
	
	public ArrayList<User> addUserPost(User user) {
		
		try {
			// Check User Does Not ALready Exist
			
			// Invoke add user
			addUser(user);
			// Invoke validate login return user and session in class.
			return validateLogin(user.getEmail() + "," + user.getPassword());
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
	
	public boolean addUser(User user) throws Exception {
		
		// Create password hash using random integer as salt
		String passwordHash = PasswordHash(user.getPassword(), Integer.toString(random.nextInt()));
		
		// Write User Details to DB
		Connection con = null;
		
		String InsrtSql = "INSERT INTO hokus.hk_user "
				+ " (user_first_name, user_last_name, user_title, user_pass, user_email, "
				+ " user_last_login ) "
				+ " VALUES ( ?,?,?,?,?,?)";
		java.sql.PreparedStatement pstmt;

		try {
			con = SqlMySQLConn.getConnection();
			pstmt = con.prepareStatement(InsrtSql);
			con.setAutoCommit(true);
			
			pstmt.setString(1, user.getUserFirstName() );
			pstmt.setString(2, user.getUserLastName() );
			pstmt.setString(3, user.getUserTitle() );
			
			String passHash = PasswordHash(user.getPassword(),
					Integer.toString(random.nextInt()));
			
			pstmt.setString(4, passHash );
			pstmt.setString(5, user.getEmail() );

			Calendar cal = Calendar.getInstance();
			pstmt.setDate(6, new java.sql.Date(cal.getTimeInMillis()));

			pstmt.addBatch();
			pstmt.executeBatch();

		} catch (Exception sqle) {
			throw sqle;
		}
		
		return true;
		
	}
	
	public ArrayList<User> validateLogin(String emailPasswordString) {
		
		String email, password;
		ArrayList<User> list = new ArrayList<User>();
		Connection c = null;
		
		try {
			email = emailPasswordString.split(",")[0];
			password = emailPasswordString.split(",")[1];
		}
		catch (Exception e) {
			User user = new User();
			user.setUserValidated(false);
			user.setUserMessage("Input Supplied To REST Is Incorrect");
			list.add(user);
			return list;			
		}
		
		// Lookup user details from database.
		String sql = "SELECT * FROM hokus.hk_user " + 
					" WHERE user_email ='" + email + "'";
		
		try {
			c = SqlMySQLConn.getConnection();
			Statement s = c.createStatement();
			ResultSet rs = s.executeQuery(sql);
			while (rs.next()) {
				list.add(processUser(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			SqlMySQLConn.close(c);
		}
		
		// Check a user record was retrieved for this email address.
		if (list.isEmpty()) {
			User user = new User();
			user.setUserValidated(false);
			user.setUserMessage("A User Does Not Exist For This Email Address!");
			list.add(user);
			return list;
		}	

		// get hashed password element from DB return.
		String DBHashedPassword = list.get(0).getPassword();
		String saltKey = DBHashedPassword.split(",")[1];
		
		// Call password hash utility with password supplied and DB salk key.
		String GenHashedPassword = PasswordHash(password, saltKey);
		if (!GenHashedPassword.equals(DBHashedPassword)) {
			System.out.println("The Password You Have Entered Is Incorrect!");
			list.get(0).setUserValidated(false);
			list.get(0).setUserMessage("The Password You Have Entered Is Incorrect!");
			return list;
		}
		else {	
			list.get(0).setUserValidated(true);
		}
		
		return list;	
	}
	
	private User processUser(ResultSet rs) throws SQLException {
		// TODO Auto-generated method stub
			
			User dataresults = new User();

			dataresults.setUserId(rs.getInt("user_id"));
			dataresults.setEmail(rs.getString("user_email"));
			dataresults.setPassword(rs.getString("user_pass"));		
			dataresults.setUserFirstName(rs.getString("user_first_name"));
			dataresults.setUserLastName(rs.getString("user_last_name"));
			dataresults.setUserTitle(rs.getString("user_title"));					
			
			return dataresults;

	}

	public String PasswordHash(String password, String saltkey) {
		try {
			String saltedAndHashed = password + "," + saltkey;
			MessageDigest digest = MessageDigest.getInstance("MD5");
			digest.update(saltedAndHashed.getBytes());
			BASE64Encoder encoder = new BASE64Encoder();
			byte hashedBytes[] = (new String(digest.digest(), "UTF-8")).getBytes();
			return encoder.encode(hashedBytes) + "," + saltkey;
		}
		catch (NoSuchAlgorithmException e) {
			throw new RuntimeException("MD5 is not available",e);
		}
		catch (UnsupportedEncodingException e) {
			throw new RuntimeException("UTF-8 unavailable",e);
		}
	}

}
