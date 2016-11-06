package com.stocker.rest;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import com.stocker.rest.SqlMySQLConn;

public class StocksLoad {
	
	public List<Stocks> findStockData(String dataSelections) {

		System.out.println("ERROR@");
		List<Stocks> list = new ArrayList<Stocks>();
		Connection c = null;
		
		String StockEx, StockName, StockId;
		
	    String[] parts = dataSelections.split("&");
		StockEx = parts[0];
		StockName = parts[1];
		StockId = parts[2]; 
	    	      
		String sql = "SELECT * FROM hokus.stock";
		
		try {
			c = SqlMySQLConn.getConnection();
			Statement s = c.createStatement();
			ResultSet rs = s.executeQuery(sql);
			while (rs.next()) {
				list.add(processStocks(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			SqlMySQLConn.close(c);
		}
		return list;
	}	
	
	protected Stocks processStocks(ResultSet rs)
			throws SQLException {
		
		Stocks dataresults = new Stocks();

		dataresults.setStockId(rs.getString("stock_id"));
		dataresults.setStockName(rs.getString("stock_name"));
		dataresults.setStockExc(rs.getString("stock_exc"));		
		System.out.println("ERROR: "+rs.getString("stock_exc"));
		return dataresults;
	}	

}
