package com.stocker.rest;

/**
 * @author DanJ
 * http://crunchify.com/how-to-build-restful-service-with-java-using-jax-rs-and-jersey/
 */

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.*;

@Path("/metadata")
public class CtoFService {
	@GET
	@Produces("application/xml")
	public String convertCtoF() {
 
		Double fahrenheit;
		Double celsius = 36.8;
		fahrenheit = ((celsius * 9) / 5) + 32;
 
		String result = "@Produces(\"application/xml\") Output: \n\nC to F Converter Output: \n\n" + fahrenheit;
		return "<ctofservice>" + "<celsius>" + celsius + "</celsius>" + "<ctofoutput>" + result + "</ctofoutput>" + "</ctofservice>";
	}

	@Path("/filtervalcols")
	@GET
	@Produces("application/xml")
    public GenericEntity<List<String>> getValueFilterCols() {

		// http://stackoverflow.com/questions/5392413/jersey-return-a-list-of-strings
        List<String> list = Arrays.asList("test", "as");

        return new GenericEntity<List<String>>(list) {};

		//valColList.add("Exchange");
		//valColList.add("Currency");
		//valColList.add("Market");
		//valColList.add("Company Value");
		//valColList.add("1 Year Trend");

		// Displaying elements of LinkedHashMap
		//return valColList;
        // use javax.ws.rs.core.GenericEntity to return the arraylist
        //return new GenericEntity<ArrayList<String>>(valColList) {};
	}

	// This end point is invoked when the user selects a data column.  It returns a LOV which can then be selectively filtered on.
	@Path("/dropdown/{column}")
	@GET
	@Produces("application/json")
	public String convertCtoFfromInput(@PathParam("column") Double c) {

		// Determine what the column contains and invoke the relevant producer.

		// Use a hash map to lookup the column from the selected column.

		// If the column is present in the list then construct a SQL statement with this value to query
		// the relevant column's values.

		// Return the resultant list as JSON.

		// Get SQL Values ??
        return null;
	}

	// This end point is invoked when the user selects a data column.  It returns a LOV which can then be selectively filtered on.


}
