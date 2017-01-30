package com.stocker.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.stocker.rest.DataClasses.Stocks;
import com.stocker.rest.DataClasses.User;
import com.stocker.rest.DataClasses.UtilLoadLog;
// Defined as a project Dependency in Java build path.
import com.get.StockInvoker;
import com.login.*;
import com.mysql.jdbc.log.Log;

//http://localhost:8080/Stocker/stocker/utils/invoke/dan

@Path("/utils")
public class StockUtilRest {
	
	//UtilReportLoad utilReportLoad= new UtilReportLoad();

	@GET
	@Path("/invoke/{loadtag}")
	// Invokes the loader rest service and reports the results.
	@Produces({ MediaType.APPLICATION_JSON })
	public UtilLoadLog produceJSON( @PathParam("loadtag") String name ) { 
		
		String fileName = "";
		HashMap hashmapLogFile;
	
		StockInvoker stockinvoker = new StockInvoker();
		fileName = stockinvoker.invoke();
		stockinvoker = null;
		
		hashmapLogFile = StockUtilLoad.utilProcessLogFile(fileName);
	
		// 		UtilLoadLog utilLoadLog = new UtilLoadLog(1,"23/12/2016","700","12","0","None","12");
		UtilLoadLog utilLoadLog = new UtilLoadLog(
				fileName,
				(String) hashmapLogFile.get("datekey"),
				(String) hashmapLogFile.get("stocksLoaded"),
				(String) hashmapLogFile.get("stocksProcessed"),
				(String) hashmapLogFile.get("stocksFailed"),
				(String) hashmapLogFile.get("stocksErrors"),
				(String) hashmapLogFile.get("duration"));
		
		return utilLoadLog;
	}	

	@GET
	@Path("/loglist")
	// Invokes the loader rest service and reports the results.
	@Produces({ MediaType.APPLICATION_JSON })
	public ArrayList<String> produceJSONLogList() {
		return StockUtilLoad.utilGetLogFiles();
	}	
	
	@GET
	@Path("/readlog/{loadtag}")
	// Invokes the loader rest service and reports the results.
	@Produces({ MediaType.APPLICATION_JSON })
	public UtilLoadLog getLogAsJSON( @PathParam("loadtag") String logName ) { 
		
		HashMap<String, String> hashmapLogFile;
		
		hashmapLogFile = StockUtilLoad.utilProcessLogFile(logName);
	
		UtilLoadLog utilLoadLog = new UtilLoadLog(
				logName,
				(String) hashmapLogFile.get("datekey"),
				(String) hashmapLogFile.get("stocksLoaded"),
				(String) hashmapLogFile.get("stocksProcessed"),
				(String) hashmapLogFile.get("stocksFailed"),
				(String) hashmapLogFile.get("stocksErrors"),
				(String) hashmapLogFile.get("duration"));
		
		return utilLoadLog;
	}	
	
	@GET
	@Path("/uservalidation/{dataSelections}")
	@Produces({ MediaType.APPLICATION_JSON })
	public ArrayList<User> validateUserLogin(@PathParam("dataSelections") String dataSelections) {
		System.out.println("hello");
		UserDAO userDAO = new UserDAO();
		return userDAO.validateLogin(dataSelections);
	}

	@POST
	@Path("/adduser")	
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public ArrayList<User> addUserRest(User user) {
		System.out.println("hello");
		System.out.println(user);
		UserDAO userDAO = new UserDAO();
		ArrayList<User> list = userDAO.addUserPost(user);
		return list;
	}
	
}


