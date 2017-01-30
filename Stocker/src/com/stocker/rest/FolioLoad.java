
package com.stocker.rest;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import com.stocker.rest.SqlMySQLConn;
import com.stocker.rest.DataClasses.FolioStock;

public class FolioLoad {
	
	public static List<FolioStock> findFolioStockData(String userId) {
		
		List<FolioStock> list = new ArrayList<FolioStock>();
		Connection c = null;
		
		String sql = "SELECT f.folio_id, f.folio_desc, f.folio_created_date, fs.stock_id, " + 
				" fs.stock_qty, fs.stock_purchase_price, fs.stock_currency, u.user_id, " + 
				" CONCAT(u.user_first_name,' ',u.user_last_name) user_name" +
				" FROM hokus.folio f , hokus.user_folio uf , hokus.folio_stock fs, " + 
				" hokus.hk_user u " + 
				" WHERE u.user_id = " + userId + 
				" AND u.user_id = uf.user_id " + 
				" AND uf.folio_id = f.folio_id " +
				" AND fs.folio_id = uf.folio_id ";
System.out.println(sql);
	
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
	
	protected static FolioStock processStockDetail(ResultSet rs)
			throws SQLException {
		
		FolioStock dataresults = new FolioStock();
		
		dataresults.setUserName(rs.getString("user_name"));
		dataresults.setUserId(rs.getInt("user_id"));
		dataresults.setFolioId(rs.getInt("folio_id"));
		dataresults.setFolioDesc(rs.getString("folio_desc"));
		dataresults.setFolioCreatedDate(rs.getDate("folio_created_date"));
		dataresults.setStockCurrency(rs.getString("stock_currency"));
		dataresults.setStockId(rs.getString("stock_id"));
		dataresults.setStockQty(rs.getDouble("stock_qty"));
		dataresults.setStockPurchasePrice(rs.getDouble("stock_purchase_price"));			
		
		System.out.println("ERROR: "+rs.getString("stock_id"));
		
		return dataresults;
	}		

}
