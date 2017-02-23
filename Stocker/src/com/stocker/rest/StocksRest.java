package com.stocker.rest;

import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.login.UserDAO;
import com.stocker.rest.DataClasses.AddStock;
import com.stocker.rest.DataClasses.FolioStock;
import com.stocker.rest.DataClasses.StockDetail;
import com.stocker.rest.DataClasses.Stocks;
import com.stocker.rest.DataClasses.User;

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
	
	@GET
	@Path("/folio/{dataSelections}")
	@Produces({ MediaType.APPLICATION_JSON })
	public List<FolioStock> findFolioStockData(@PathParam("dataSelections") String dataSelections) {
		return FolioLoad.findFolioStockData(dataSelections);
	}
	
	@POST
	@Path("/folio/addstock")	
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON })
	public ArrayList<AddStock> addUserRest(AddStock addstock) {
		System.out.println(addstock);
		ArrayList<AddStock> list = FolioLoad.addStockToFolio(addstock);
		return list;
	}
	
}


