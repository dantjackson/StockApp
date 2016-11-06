package com.stocker.rest;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

//http://localhost:8080/Stocker/stocker/stocks/ss

@Path("/stocks")
public class StocksRest {
	
	StocksLoad stockLoad= new StocksLoad();

	@GET
	@Path("/{dataSelections}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<Stocks> findStockData(@PathParam("dataSelections") String dataSelections) {
		return stockLoad.findStockData(dataSelections);
	}

}
