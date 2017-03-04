package com.get;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

public class StockInvoker {
	
	static final Logger LOG = LoggerFactory.getLogger(StockInvoker.class);

	ArrayList<String> stocks;
	Integer symbolperthread = 20;
	public Connection con;

	public String invoke() {
		
		String logFileFormat;
		
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("ddMMyy-HHmmss");
		LocalDateTime localDateTime = LocalDateTime.now();
		logFileFormat = "StockReaderLog-" + dtf.format(localDateTime).toString();

		
		MDC.put("logFileName", logFileFormat);
		StockInvoker si = new StockInvoker();
		
		try {
			// Call Method To Invoke Processing
			si.GetStockListFromDB("null");
			si.IterateBatchRows(logFileFormat);
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error("Problem Invoking Stock Invoker:"+e);
		}
		
		MDC.remove("logFileName");
		return logFileFormat;
	}

	public void IterateBatchRows (String logFileFormat) throws InterruptedException {

		Integer innerLoopMax = 0;
		Integer rowCount = 0;
		Integer innercarray = 0;
		Integer threadId = 0;
		ArrayList<String> subsymbols;
		
		ArrayList<String> listofallsymbols = this.stocks;
		rowCount = listofallsymbols.size();
		LOG.info("No Of Symbols To Process:" + rowCount);
		
		// Define an Executor Service
		final int numThreads = 5;
		ExecutorService executor = Executors.newFixedThreadPool(numThreads);
		
         for (int i = 0; i < rowCount; i=i+symbolperthread) {
 
             // Thread Call Every symbolperthread Rows
             innerLoopMax = Math.min(i+symbolperthread,rowCount);          
             subsymbols = new ArrayList<String>();
             innercarray = 0;
             threadId ++;
             
             // Build List Of Symbols Per Thread
             for (int c = i; c < innerLoopMax; c++) {
            	 subsymbols.add(innercarray, listofallsymbols.get(c));	 
            	 innercarray++;
             }
             	
             try { 
               // Invoke Processing on a worker thread.
               LOG.info("Calling ThreadWorker:" + threadId + " Symbols:" + subsymbols.size());
               Runnable worker = new StockWorkerThread("Thread"+threadId, subsymbols, this.con, logFileFormat);
               executor.execute(worker);
                 }
             catch (Exception e) {
                         e.printStackTrace();
                         LOG.error("Exception Calling threadWorker" + e);
             };
             
         } // for
         
      //-------------------------------------------------    
      // If threads do not complete in 60 seconds terminate
      //-------------------------------------------------   
     executor.shutdown();    
     if (executor.awaitTermination(60, TimeUnit.SECONDS)) {
    	  LOG.info("All Threads Completed");
    	} else {
    	  LOG.warn("Forcing shutdown Timeout:60");
    	  executor.shutdownNow();
    	}   
         
	} // IterateBatchRows

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
			this.con.setAutoCommit(false);
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
