package com.stocker.rest.DataClasses;

public class AddStock {

	String stockId;
	Float stockPrice;	
	Integer stockQty;
	Boolean stockAdded;
	String stockMessage;
	
	public AddStock () {};
	
	public AddStock(String stockId, Float stockPrice, Integer stockQty, 
			Boolean stockAdded, String stockMessage) {
		this.stockId = stockId;
		this.stockPrice = stockPrice;
		this.stockQty = stockQty;
		this.stockAdded = stockAdded;
		this.stockMessage = stockMessage;
	}
	
	@Override
	public String toString() {
		return new StringBuffer("stockId : ").append(this.stockId)
				.append("stockPrice : ").append(this.stockPrice)
				.append("stockQty : ").append(this.stockQty)
				.append("stockAdded : ").append(this.stockAdded)
				.append("stockMessage : ").append(this.stockMessage)
			    .toString();	
	}

	public String getStockId() {
		return stockId;
	}

	public void setStockId(String stockId) {
		this.stockId = stockId;
	}

	public Float getStockPrice() {
		return stockPrice;
	}

	public void setStockPrice(Float stockPrice) {
		this.stockPrice = stockPrice;
	}

	public Integer getStockQty() {
		return stockQty;
	}

	public void setStockQty(Integer stockQty) {
		this.stockQty = stockQty;
	}

	public Boolean getStockAdded() {
		return stockAdded;
	}

	public void setStockAdded(Boolean stockAdded) {
		this.stockAdded = stockAdded;
	}

	public String getStockMessage() {
		return stockMessage;
	}

	public void setStockMessage(String stockMessage) {
		this.stockMessage = stockMessage;
	}		
	
}
