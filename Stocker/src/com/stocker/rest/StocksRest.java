package com.stocker.rest;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.stocker.rest.DataClasses.Stocks;

//http://localhost:8080/Stocker/stocker/stocks/s&s&s

@Path("/stocks")
public class StocksRest {
	
	StocksLoad stockLoad= new StocksLoad();
	StockDetailLoad stockDetailLoad= new StockDetailLoad();

	@GET
	@Path("/{dataSelections}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<Stocks> findStockData(@PathParam("dataSelections") String dataSelections) {
		return stockLoad.findStockData(dataSelections);
	}

	@GET
	@Path("/detail/{dataSelections}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<StockDetail> findStockDetailData(@PathParam("dataSelections") String dataSelections) {
		return stockDetailLoad.findStockDetailData(dataSelections);
	}
	
}


