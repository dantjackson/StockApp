package com.get;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.get.Hibernate.Stock;
import com.get.Hibernate.StockDetail;

import java.util.Date;

public class StockCSVTickerUploader {

	public static void main(String[] args) {

		// Need to define some Params slurper thing
		// DAN DAN DAN - hardcoded for now
		String csvFile = "/Users/danjackson/Documents/workspace_neon/StockCSV/UKStocks.csv";
		String line = "";
		Integer count = 0;

		System.out.println("Hibernate one to one (XML mapping)");
		Session session = HibernateUtil.getSessionFactory().openSession();

		Transaction tx = session.beginTransaction();

		try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {

			while ((line = br.readLine()) != null) {

				Stock stock = new Stock();

				// use comma as separator
				String[] stockrow = line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1);

				System.out.println("StockID=" + stockrow[0] + ",StockName=" + stockrow[1] + ",StockExc=" + stockrow[2]
						+ ",StockCountry=" + stockrow[3] + ",StockCategory=" + stockrow[4] + ",StockCategoryId="
						+ stockrow[5] + "]");

				stock.setStockId(stockrow[0]);
				stock.setStockName(stockrow[1]);
				stock.setStockExc(stockrow[2]);
				stock.setCountry(stockrow[3]);
				stock.setSectorDesc(stockrow[4]);
				stock.setSectorId(stockrow[5]);
				
	            try {
	                session.persist(stock);  // session.save(stock);
	            } catch (Exception e) {
	                // don't do anything...
	            }
				
				count++;
				if (count % 20 == 0) { // 20, same as the JDBC batch size
					// flush a batch of inserts and release memory:
					//session.flush();
					//session.clear();
				}

			}

		} catch (Exception e) {
			if (tx != null) {
				e.printStackTrace();
				tx.rollback();
			}
		} finally {
			// Close Session.
			tx.commit();
			session.close();
		}

		System.out.println("Done");

	}
}
