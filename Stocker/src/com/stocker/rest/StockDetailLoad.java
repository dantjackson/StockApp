package com.stocker.rest;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import com.stocker.rest.SqlMySQLConn;
import com.stocker.rest.DataClasses.StockDetail;

public class StockDetailLoad {

	
	public List<StockDetail> findStockDetailData(String dataSelections) {
	
	List<StockDetail> list = new ArrayList<StockDetail>();
	Connection c = null;
	
	
	String StockEx = dataSelections; 
	
	String sql = "SELECT stock_id, stock_ask, stock_bid, YearHigh, YearLow " +
				" FROM hokus.stock_detail " + 
			    " WHERE stock_id ='" + StockEx  + "'";
	
	try {
		c = SqlMySQLConn.getConnection();
		Statement s = c.createStatement();
		ResultSet rs = s.executeQuery(sql);
		while (rs.next()) {
			list.add(processStockDetail(rs));
		}
	} catch (SQLException e) {
		e.printStackTrace();
		throw new RuntimeException(e);
	} finally {
		SqlMySQLConn.close(c);
	}
	
	return list;
	
	}
	
	protected StockDetail processStockDetail(ResultSet rs)
			throws SQLException {
		
		StockDetail dataresults = new StockDetail();

		dataresults.setStockId(rs.getString("stock_id"));
		dataresults.setStockAsk(rs.getDouble("stock_ask"));
		dataresults.setStockBid(rs.getDouble("stock_bid"));		
		dataresults.setStockYearHigh(rs.getDouble("YearHigh"));
		dataresults.setStockYearLow(rs.getDouble("YearLow"));			
		
		System.out.println("ERROR: "+rs.getString("stock_id"));
		
		return dataresults;
	}		
	
}
