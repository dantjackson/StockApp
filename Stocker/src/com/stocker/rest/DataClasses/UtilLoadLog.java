package com.stocker.rest.DataClasses;

public class UtilLoadLog {
	
	private String loadId;
	private String loadDateTime;
	private String stocksLoaded;
	private String stocksProcessed;
	private String stocksFailed;
	private String stocksErrors;
	private String loadDuration;
	
	// Must have no-argument constructor
	public UtilLoadLog () {};
	
	public UtilLoadLog(String loadId, String loadDateTime, String stocksLoaded, String stocksProcessed,
			String stocksFailed, String stocksErrors, String loadDuration) {
		this.loadId = loadId;
		this.loadDateTime = loadDateTime;
		this.stocksLoaded = stocksLoaded;
		this.stocksProcessed = stocksProcessed;
		this.stocksFailed = stocksFailed;
		this.stocksErrors = stocksErrors;
		this.loadDuration = loadDuration;
	}
	
	@Override
	public String toString() {
		return new StringBuffer("loadId : ").append(this.loadId)
				.append("loadDateTime : ").append(this.loadDateTime)
				.append("stocksLoaded : ").append(this.stocksLoaded)
				.append("stocksProcessed : ").append(this.stocksProcessed)
				.append("stocksFailed : ").append(this.stocksFailed)
				.append("stocksErrors : ").append(this.stocksErrors)
				.append("loadDuration : ").append(this.loadDuration)
			    .toString();	
	}

	public String getStocksProcessed() {
		return stocksProcessed;
	}

	public void setStocksProcessed(String stocksProcessed) {
		this.stocksProcessed = stocksProcessed;
	}

	public String getStocksFailed() {
		return stocksFailed;
	}

	public void setStocksFailed(String stocksFailed) {
		this.stocksFailed = stocksFailed;
	}

	public String getStocksErrors() {
		return stocksErrors;
	}

	public void setStocksErrors(String stocksErrors) {
		this.stocksErrors = stocksErrors;
	}

	public String getLoadId() {
		return loadId;
	}

	public void setLoadId(String loadId) {
		this.loadId = loadId;
	}

	public String getLoadDateTime() {
		return loadDateTime;
	}

	public void setLoadDateTime(String loadDateTime) {
		this.loadDateTime = loadDateTime;
	}

	public String getStocksLoaded() {
		return stocksLoaded;
	}

	public void setStocksLoaded(String stocksLoaded) {
		this.stocksLoaded = stocksLoaded;
	}

	public String getThreadsSuccessful() {
		return stocksProcessed;
	}

	public String getLoadDuration() {
		return loadDuration;
	}

	public void setLoadDuration(String loadDuration) {
		this.loadDuration = loadDuration;
	}

}
