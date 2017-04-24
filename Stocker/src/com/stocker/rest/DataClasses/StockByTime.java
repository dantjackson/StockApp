package com.stocker.rest.DataClasses;

public class StockByTime {
	
	String stockId;
	String stockDate;
	Double stockBid;
	public String getStockId() {
		return stockId;
	}
	public void setStockId(String stockId) {
		this.stockId = stockId;
	}
	public String getStockDate() {
		return stockDate;
	}
	public void setStockDate(String stockDate) {
		this.stockDate = stockDate;
	}
	public Double getStockBid() {
		return stockBid;
	}
	public void setStockBid(Double stockBid) {
		this.stockBid = stockBid;
	}
	


}
