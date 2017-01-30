package com.stocker.rest.DataClasses;

import java.sql.Date;

public class FolioStock {
	
	String userName;
	Integer userId;
	String folioDesc;
	Date folioCreatedDate;
	Integer folioId;
	String stockId; 
	Double stockQty;
	String stockCurrency;
	Double stockPurchasePrice;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getFolioDesc() {
		return folioDesc;
	}
	public void setFolioDesc(String folioDesc) {
		this.folioDesc = folioDesc;
	}
	public Date getFolioCreatedDate() {
		return folioCreatedDate;
	}
	public void setFolioCreatedDate(Date folioCreatedDate) {
		this.folioCreatedDate = folioCreatedDate;
	}
	public Integer getFolioId() {
		return folioId;
	}
	public void setFolioId(Integer folioId) {
		this.folioId = folioId;
	}
	public String getStockId() {
		return stockId;
	}
	public void setStockId(String stockId) {
		this.stockId = stockId;
	}
	public Double getStockQty() {
		return stockQty;
	}
	public void setStockQty(Double stockQty) {
		this.stockQty = stockQty;
	}
	public String getStockCurrency() {
		return stockCurrency;
	}
	public void setStockCurrency(String stockCurrency) {
		this.stockCurrency = stockCurrency;
	}
	public Double getStockPurchasePrice() {
		return stockPurchasePrice;
	}
	public void setStockPurchasePrice(Double stockPurchasePrice) {
		this.stockPurchasePrice = stockPurchasePrice;
	}
	
	
	
}
