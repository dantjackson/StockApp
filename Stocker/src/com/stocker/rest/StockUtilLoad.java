package com.stocker.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;

public class StockUtilLoad {

	 static HashMap<String, String> utilProcessLogFile(String fileName) {
		
		 HashMap<String, String> hmap = new HashMap<String, String>(); 
		 Integer stocksLoaded = 0;
		 String lastline="";
		 LocalTime startTime = null, endTime = null; 
		 
		// Append log file path to the filename.
		GetProps props = new GetProps();
		hmap.put("datekey",fileName);
		
		try {
			String logFilePath = props.getPropValues("logFilePath");
			fileName = logFilePath + "/" + fileName;
			if (!fileName.endsWith(".log"))	{
				fileName = fileName + ".log"; 
			}
					
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		
		//
		hmap.put("stocksLoaded","0");
		hmap.put("stocksProcessed","0");
		hmap.put("stocksFailed","0");
		hmap.put("stocksErrors","0");
		hmap.put("duration","0");		
		
		// Loop file by line
		try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
	
			String sCurrentLine;
			int filelineNo=0;	
			while ((sCurrentLine = br.readLine()) != null) {
				
				// Get first line
				filelineNo++;
				if (filelineNo==1) {
					String startTimeAsString = sCurrentLine.substring(0,12);
					startTime = LocalTime.parse(startTimeAsString) ;		
				}
				
				System.out.println(sCurrentLine);
				
				if (sCurrentLine.contains("Process:")) {
					hmap.put("stocksProcessed", 
							sCurrentLine.substring(
									sCurrentLine.indexOf("Process:")+8, sCurrentLine.length()));
				}
				
				if (sCurrentLine.contains("LoadedToDB:")) {
					stocksLoaded++;
				}				
				lastline = sCurrentLine;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}		
		
		// Get end time from last line in the log
		lastline = lastline.substring(0,12);
		endTime = LocalTime.parse(lastline) ;	
		Duration duration = Duration.between(startTime, endTime);
        String seconds = Long.toString(duration.getSeconds());		
        hmap.put("duration",seconds+" S");
		
		if (stocksLoaded>0) {
			hmap.put("stocksLoaded",stocksLoaded.toString());
		}
		return hmap;
		
	}
	 
	static ArrayList<String> utilGetLogFiles() {
		
		String logFilePath = "";
		GetProps props = new GetProps();
		try {
			logFilePath = props.getPropValues("logFilePath");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		File folder = new File(logFilePath);
		File[] listOfFiles = folder.listFiles();
		ArrayList<String> fileList = new ArrayList<String>();

		    for (int i = 0; i < listOfFiles.length; i++) {
		      if (listOfFiles[i].isFile()) {
		    
		        if (listOfFiles[i].getName().endsWith((".log"))) {
		        	// Add file to arraylist
		        	fileList.add(listOfFiles[i].getName());
		        }
		      } 
		    }
		return fileList;
	}
}
