package com.get;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

/**
 * @author dan jackson Change History : To Test The Query
 *         https://developer.yahoo.com/yql/console/?debug=true#h=select+*+from+yahoo.finance.quotes
 *         JSONObject json =
 *         readJsonFromUrl("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys");
 */
public class StockWorkerThread implements Runnable {

	ArrayList<String> symbols;
	Connection con;
	String thread;
	String logFileName;
	static final Logger LOG = LoggerFactory.getLogger(StockInvoker.class);

	@Override
	public void run() {
		
		// Setup Log
		System.out.println("Calling Log File"+logFileName);
		MDC.put("logFileName", logFileName);
		StockInvoker si = new StockInvoker();
		LOG.info(Thread.currentThread().getName() + " Start ");
		// ------------------------------------------------------------
		// Execute Code To Call YSQL API
		// Process JSON and DB Load Data
		// ------------------------------------------------------------
		try {
			getYQLStockDetailJSON();
			LOG.info(Thread.currentThread().getName() + ":Completed" );
		} catch (JSONException | IOException e) {
			//e.printStackTrace();
			LOG.error(Thread.currentThread().getName() + ":Failed:	" + e);
		}
		MDC.remove("logFileName");
	}

	// Defined as a constructor
	public StockWorkerThread(String thread, ArrayList<String> symbols, Connection con, String logFileFormat) {
		// Setup Class Vars From Invoker Args
		this.con = con;
		this.symbols = symbols;
		this.thread = thread;
		this.logFileName = logFileFormat;
	}

	private static String readAll(Reader rd) throws IOException {
		StringBuilder sb = new StringBuilder();
		int cp;
		while ((cp = rd.read()) != -1) {
			sb.append((char) cp);
		}
		return sb.toString();
	}

	public static JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
		InputStream is = new URL(url).openStream();
		try {
			BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
			String jsonText = readAll(rd);
			JSONObject json = new JSONObject(jsonText);
			return json;
		} finally {
			is.close();
		}
	}

	public void getYQLStockDetailJSON() throws IOException, JSONException {

		Map<String, String> quoteshash = null;
		boolean singlequotebool;

		// GetList Of Stocks
		List<String> StockList = this.symbols;
		String EscapedStockList = String.join(",", StockList);
		EscapedStockList = URLEncoder.encode(EscapedStockList, "UTF-8");
		//LOG.info(EscapedStockList);

		String StringURL = "https://query.yahooapis.com/v1/public/yql?q="
				+ "select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(" + EscapedStockList
				+ ")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
		//LOG.info(StringURL);

		JSONObject json = readJsonFromUrl(StringURL);
		//LOG.info("JSON returned:" + json.toString());

		// Recurse the JSON object to the results JSON object
		JSONObject query = json.getJSONObject("query");
		JSONObject results = query.getJSONObject("results");

		// Count Number of keys in results to determine getJSON or JSON Array.
		// If only single symbol returned you to do not get a JSON array.
		try {
			results.getJSONArray("quote");
			singlequotebool = false;
		} catch (Exception e) {
			singlequotebool = true;
		}

		// If many quotes returned object is JSON array otherwise object!
		if (singlequotebool == true) {
			try {
				JSONObject quote = results.getJSONObject("quote");
				quoteshash = ProcessQuoteData(quote);
				InsertStockDetail(quoteshash);
			}
			catch (Exception e) {
				LOG.debug("JSON returned:" + json.toString());
			}
		} else {

			JSONArray quote = results.getJSONArray("quote");

			for (int i = 0, size = quote.length(); i < size; i++) {
				try {
					JSONObject objectInArray = quote.getJSONObject(i);
					quoteshash = ProcessQuoteData(objectInArray);
					InsertStockDetail(quoteshash);
				}
				catch (Exception e) {
					LOG.debug("JSON returned:" + json.toString());
				}
			}
		}
	} // Sub

	public static Map<String, String> ProcessQuoteData(JSONObject json) {

		HashMap<String, String> out = new HashMap<String, String>();

		// "...and get their component and their value."
		String[] elementNames = JSONObject.getNames(json);
		//LOG.info("%d ELEMENTS IN CURRENT OBJECT:\n", elementNames.length);
		for (String elementName : elementNames) {
			try {
				String value = json.getString(elementName);
				//System.out.printf("name=%s, value=%s\n", elementName, value);
				out.put(elementName, value);
			} catch (Exception e) {
				// Do Nothing
			}
		}
		LOG.info("Symbol:" + out.get("symbol") + "NumberOfHashKeys:" + out.size());
		return out;
	}

	public static void InsertStockDetail(Map<String, String> input) {

		Connection con = null;

		String symbol = (String) input.get("symbol");
		String name = (String) input.get("Name");
		String bid = (String) input.get("Bid");
		String ask = (String) input.get("Ask");
		String YearHigh = (String) input.get("YearHigh");
		String YearLow = (String) input.get("YearLow");
		String PreviousClose = (String) input.get("PreviousClose");
		String Currency = (String) input.get("Currency");
		String BookValue = (String) input.get("BookValue");
		String EarningsShare = (String) input.get("EarningsShare");
		String PEGRatio = (String) input.get("PEGRatio");
		String ChangeFromYearLow = (String) input.get("ChangeFromYearLow");
		String ChangeFromTwoHundreddayMovingAverage = (String) input.get("ChangeFromTwoHundreddayMovingAverage");
		String YearRange = (String) input.get("YearRange");
		String ChangeFromFiftydayMovingAverage = (String) input.get("ChangeFromFiftydayMovingAverage");
		String Volume = (String) input.get("Volume");
		String AverageDailyVolume = (String) input.get("AverageDailyVolume");
		String ShortRatio = (String) input.get("ShortRatio");
		String EPSEstimateNextYear = (String) input.get("EPSEstimateNextYear");
		String EPSEstimateNextQuarter = (String) input.get("EPSEstimateNextQuarter");
		String PriceEPSEstimateCurrentYear = (String) input.get("EPSEstimateCurrentYear");
		String DaysRange = (String) input.get("DaysRange");
		String MarketCapitalization = (String) input.get("MarketCapitalization");
		String EBITDA = (String) input.get("EBITDA");
		String PriceBook = (String) input.get("PriceBook");
		String PriceSales = (String) input.get("PriceSales");
		String LastTradePriceOnly = (String) input.get("LastTradePriceOnly");
		String Open = (String) input.get("Open");

		String LastTradeDateStr = (String) input.get("LastTradeDate");
		DateFormat df = new SimpleDateFormat("MM/DD/YYYY");
		java.util.Date parsed = null;
		java.sql.Date LastTradeDate = null;
		if (LastTradeDateStr != null) {
			try {
				parsed = df.parse(LastTradeDateStr);
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			LastTradeDate = new java.sql.Date(parsed.getTime());
		}

		// Write Class Data To The DB
		try {
			con = SqlMySQLConn.getConnection();

			WriteStockDetailtoDB(symbol, name, bid, ask, YearHigh, YearLow, PreviousClose, Currency, LastTradeDate,
					BookValue, EarningsShare, PEGRatio, ChangeFromYearLow, ChangeFromTwoHundreddayMovingAverage,
					YearRange, ChangeFromFiftydayMovingAverage, Volume, AverageDailyVolume, ShortRatio,
					EPSEstimateNextYear, EPSEstimateNextQuarter, PriceEPSEstimateCurrentYear, DaysRange,
					MarketCapitalization, EBITDA, PriceBook, PriceSales, LastTradePriceOnly, Open, con);
		
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			SqlMySQLConn.close(con);
		}
	}

	public static void WriteStockDetailtoDB(String StockId, String StockName, String StockBid, String StockAsk,
			String YearHigh, String YearLow, String PreviousClose, String Currency, Date LastTradeDate,
			String BookValue, String EarningsShare, String PEGRatio, String ChangeFromYearLow,
			String ChangeFromTwoHundreddayMovingAverage, String YearRange, String ChangeFromFiftydayMovingAverage,
			String Volume, String AverageDailyVolume, String ShortRatio, String EPSEstimateNextYear,
			String EPSEstimateNextQuarter, String PriceEPSEstimateCurrentYear, String DaysRange,
			String MarketCapitalization, String EBITDA, String PriceBook, String PriceSales, String LastTradePriceOnly,
			String Open, Connection wrtCon) throws SQLException {

		String InsrtSql = "INSERT INTO hokus.stock_detail "
				+ " ( stock_id, stock_date, stock_name, stock_bid, stock_ask, YearHigh, "
				+ " YearLow, PreviousClose, Currency, LastTradeDate, BookValue, EarningsShare, "
				+ "	PEGRatio, ChangeFromYearLow, ChangeFromTwoHundreddayMovingAverage,  "
				+ "	YearRange, ChangeFromFiftydayMovingAverage, Volume, AverageDailyVolume, "
				+ " ShortRatio, EPSEstimateNextYear, EPSEstimateNextQuarter, PriceEPSEstimateCurrentYear, "
				+ "	DaysRange, MarketCapitalization, EBITDA, PriceBook, PriceSales, "
				+ "	LastTradePriceOnly, Open  ) "
				+ " VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		java.sql.PreparedStatement pstmt;

		//LOG.info(InsrtSql);

		try {
			pstmt = wrtCon.prepareStatement(InsrtSql);
			wrtCon.setAutoCommit(true);
			pstmt.setString(1, StockId);
			
			// Added a 5.5 Mysql there is no default for date allowed.
			Calendar cal = Calendar.getInstance();
			pstmt.setDate(2, new java.sql.Date(cal.getTimeInMillis()));
			
			pstmt.setString(3, StockName);
			pstmt.setString(4, StockBid);
			pstmt.setString(5, StockAsk);
			pstmt.setString(6, YearHigh);
			pstmt.setString(7, YearLow);
			pstmt.setString(8, PreviousClose);
			pstmt.setString(9, Currency);
			pstmt.setDate(10, LastTradeDate);
			pstmt.setString(11, BookValue);
			pstmt.setString(12, EarningsShare);
			pstmt.setString(13, PEGRatio);
			pstmt.setString(14, ChangeFromYearLow);
			pstmt.setString(15, ChangeFromTwoHundreddayMovingAverage);
			pstmt.setString(16, YearRange);
			pstmt.setString(17, ChangeFromFiftydayMovingAverage);
			pstmt.setString(18, Volume);
			pstmt.setString(19, AverageDailyVolume);
			pstmt.setString(20, ShortRatio);
			pstmt.setString(21, EPSEstimateNextYear);
			pstmt.setString(22, EPSEstimateNextQuarter);
			pstmt.setString(23, PriceEPSEstimateCurrentYear);
			pstmt.setString(24, DaysRange);
			pstmt.setString(25, MarketCapitalization);
			pstmt.setString(26, EBITDA);
			pstmt.setString(27, PriceBook);
			pstmt.setString(28, PriceSales);
			pstmt.setString(29, LastTradePriceOnly);
			pstmt.setString(30, Open);

			pstmt.addBatch();
			pstmt.executeBatch();
			LOG.info("LoadedToDB:" + StockId);
		} catch (Exception sqle) {
			LOG.error("FailedToLoadToDB:" + StockId + " Error:" + sqle.getMessage());
			throw sqle;
		}
	}

}
