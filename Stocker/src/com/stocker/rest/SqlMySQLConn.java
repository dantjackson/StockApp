package com.stocker.rest;

import java.sql.*;

public class SqlMySQLConn {

	private String url;
	private String password;
	private String username;
	private static SqlMySQLConn instance;

	private SqlMySQLConn()
	{
		try {
			

			Class.forName("com.mysql.jdbc.Driver");  
			url = "jdbc:mysql://localhost:3306/hokus";
			username = "root";
			password = "welcome1";

		} catch (Exception e) {
			System.out.println("Failed to Register JDBC Driver!");
			e.printStackTrace();
		}
		System.out.println("Oracle JDBC Driver Registered!");
	}

	
	public static Connection getConnection() throws SQLException {
		if (instance == null) {
			instance = new SqlMySQLConn();
		}
		try {
			return DriverManager.getConnection(instance.url,instance.username,instance.password);
		} catch (SQLException e) {
			throw e;
		}
	}
	
	public static void close(Connection connection)
	{
		try {
			if (connection != null) {
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}

	
