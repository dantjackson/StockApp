package com.get;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class StockInvoker {

	ArrayList<String> stocks;
	Integer symbolperthread = 6;
	public Connection con;

	public static void main(String[] args) {
		StockInvoker si = new StockInvoker();
		try {
			// Call Method To Invoke Processing
			si.GetStockListFromDB("null");
			si.IterateBatchRows();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void IterateBatchRows () {

		Integer innerLoopMax = 0;
		Integer rowCount = 0;
		Integer innercarray = 0;
		ArrayList<String> subsymbols;
		
		ArrayList<String> listofallsymbols = this.stocks;
		rowCount = listofallsymbols.size();
		ExecutorService executor = Executors.newFixedThreadPool(5);
		
		System.out.println(rowCount);
         for (int i = 0; i < rowCount; i=i+symbolperthread) {
 
             // Thread Call Every symbolperthread Rows
             innerLoopMax = Math.min(i+symbolperthread,rowCount);          
             subsymbols = new ArrayList<String>();
             innercarray = 0;
             
             // Build List Of Symbols Per Thread
             for (int c = i; c < innerLoopMax; c++) {
            	 subsymbols.add(innercarray, listofallsymbols.get(c));	 
            	 innercarray++;
             }
             	
             try { 
               // Invoke Processing on a worker thread.
               System.out.println("Calling ThreadWorker" + subsymbols);
               Runnable worker = new StockWorkerThread("Thread"+i, subsymbols, this.con);
               executor.execute(worker);
                 }
             catch (Exception e) {
                         e.printStackTrace();
                         // QASLog.logErrorToDB(con, this.BatchID, e.getMessage(),"Error Invoking Worker Thread");}
             }
              finally {};
             
         } // for
	}
         
    //-------------------------------------------------    
    // Add code to wait for all threads to complete.
    //-------------------------------------------------     

	public void GetStockListFromDB(String Exchange) {

		ArrayList<String> stocks = new ArrayList<String>();
		Connection con;
		// Get Stocks Which do not have a Entry on rundate.
		// Rundates need to tie in with market close times by Exc.
		String query = "SELECT stock_id " + "FROM hokus.stock s " + " WHERE NOT EXISTS (   "
				+ "			SELECT 1 FROM hokus.stock_detail sd " + "			WHERE sd.stock_id = s.stock_id "
				+ " 			AND DATE(sd.stock_date) = DATE(sysdate()) )";
		System.out.print(query);

		try {
			this.con = SqlMySQLConn.getConnection();
			Statement stmt = this.con.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {
				stocks.add("'" + rs.getString(1) + "'");

			}
			// this.con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		this.stocks = stocks;
	}

}
