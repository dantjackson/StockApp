package com.stocker.rest;

public class StockDetail {

	String stockId;
	Double stockAsk;
	Double stockBid;
	Double stockYearHigh;
	Double stockYearLow;
	public String getStockId() {
		return stockId;
	}
	public void setStockId(String stockId) {
		this.stockId = stockId;
	}
	public Double getStockAsk() {
		return stockAsk;
	}
	public void setStockAsk(Double stockAsk) {
		this.stockAsk = stockAsk;
	}
	public Double getStockBid() {
		return stockBid;
	}
	public void setStockBid(Double stockBid) {
		this.stockBid = stockBid;
	}
	public Double getStockYearHigh() {
		return stockYearHigh;
	}
	public void setStockYearHigh(Double stockYearHigh) {
		this.stockYearHigh = stockYearHigh;
	}
	public Double getStockYearLow() {
		return stockYearLow;
	}
	public void setStockYearLow(Double stockYearLow) {
		this.stockYearLow = stockYearLow;
	}
		
}
