package com.stocker.rest.DataClasses;

import java.sql.Date;
import java.text.DecimalFormat;

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
	Double EarningsShare;
	Double BookValue;
	Double YearHigh;
	Double YearLow;
	Double ChangeFromTwoHundreddayMovingAverage;
	Double ChangeFromFiftydayMovingAverage;
	Double stock_bid;		
	Double stock_ask;			
	String profit;
	String fiftyDayChangePercent;
	String twoHundredDayChangePercent;
	String purchaseValue;
	String currentValue;
	String stockName;
	
	public String getStockName() {
		return stockName;
	}

	public void setStockName(String stockName) {
		this.stockName = stockName;
	}

	public String getCurrentValue() {
		if (this.currentValue!=null) {
			return currentValue;
		}
		if (this.stock_bid>0 && this.stockQty > 0) {
			Double currValueCalc = (this.stock_bid/100) * this.stockQty ;
			DecimalFormat df = new DecimalFormat("0.#") ;
			return df.format(currValueCalc);	
		}
		else 
		{
			return "0";
		}			
	}	
	
	public String getPurchaseValue() {
		if (this.purchaseValue!=null) {
			return purchaseValue;
		}	
		if (this.stockPurchasePrice>0 && this.stockQty > 0) {
			Double PurchasePriceCalc = (this.stockPurchasePrice/100) * this.stockQty ;
			DecimalFormat df = new DecimalFormat("0.#") ;
			return df.format(PurchasePriceCalc);	
		}
		else 
		{
			return "0";
		}			
	}
	
	public String getFiftyDayChangePercent() {
		if (this.stock_bid==null) {
			return null;
		}		
		if (this.ChangeFromFiftydayMovingAverage>0 && this.stock_bid>0) {
			Double PercentCalc = ((this.ChangeFromFiftydayMovingAverage) 
					/ this.stock_bid ) * 100;
			DecimalFormat df = new DecimalFormat("0.##") ;
			return df.format(PercentCalc) + "%";			
		}
		else 
		{
			return "0";
		}		
	}

	public String getTwoHundredDayChangePercent() {
		if (this.stock_bid==null) {
			return null;
		}
		if (this.ChangeFromTwoHundreddayMovingAverage>0 && this.stock_bid>0) {
			Double PercentCalc = ((this.ChangeFromTwoHundreddayMovingAverage) 
					/ this.stock_bid ) * 100;
			DecimalFormat df = new DecimalFormat("0.##");
			return df.format(PercentCalc) + "%";
		}
		else 
		{
			return "0";
		}		
	}
	
	// Derived Fields
	public String getProfit() {
		if (this.profit!=null) {
			return profit;
		}
		if (this.stockQty>0 && this.stock_ask>0 && this.stockPurchasePrice>0) {
			Double profit = ((this.stockQty * (this.stock_ask/100) - 
						(this.stockPurchasePrice/100) * this.stockQty));
			DecimalFormat df = new DecimalFormat("0.##");
			return df.format(profit);
		}
		else 
		{
			return "0.0";
		}

	}
	
	// Getters and Setters
	public Double getStockBid() {
		return stock_bid;
	}
	public void setStockBid(Double stock_bid) {
		this.stock_bid = stock_bid;
	}
	public Double getStockAsk() {
		return stock_ask;
	}
	public void setStockAsk(Double stock_ask) {
		this.stock_ask = stock_ask;
	}
	public Double getEarningsShare() {
		return EarningsShare;
	}
	public void setEarningsShare(Double earningsShare) {
		EarningsShare = earningsShare;
	}
	public Double getBookValue() {
		return BookValue;
	}
	public void setBookValue(Double bookValue) {
		BookValue = bookValue;
	}
	public Double getYearHigh() {
		return YearHigh;
	}
	public void setYearHigh(Double yearHigh) {
		YearHigh = yearHigh;
	}
	public Double getYearLow() {
		return YearLow;
	}
	public void setYearLow(Double yearLow) {
		YearLow = yearLow;
	}
	public Double getChangeFromTwoHundreddayMovingAverage() {
		return ChangeFromTwoHundreddayMovingAverage;
	}
	public void setChangeFromTwoHundreddayMovingAverage(Double changeFromTwoHundreddayMovingAverage) {
		ChangeFromTwoHundreddayMovingAverage = changeFromTwoHundreddayMovingAverage;
	}
	public Double getChangeFromFiftydayMovingAverage() {
		return ChangeFromFiftydayMovingAverage;
	}
	public void setChangeFromFiftydayMovingAverage(Double changeFromFiftydayMovingAverage) {
		ChangeFromFiftydayMovingAverage = changeFromFiftydayMovingAverage;
	}
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
	public void setProfit(String profit) {
		this.profit = profit;
	}
	public void setPurchaseValue(String purchaseValue) {
		this.purchaseValue = purchaseValue;
	}

	public void setCurrentValue(String currentValue) {
		this.currentValue = currentValue;
	}	
	
	
	
}
