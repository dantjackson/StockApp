#Download Debian
FROM debian:jessie

ENV MYSQL_MAJOR 5.7
ENV MYSQL_VERSION 5.7.16-1debian8

RUN groupadd -r mysql && useradd -r -g mysql mysql
RUN echo "deb http://repo.mysql.com/apt/debian/ jessie mysql-${MYSQL_MAJOR}" > /etc/apt/sources.list.d/mysql.list

RUN { \
		echo mysql-community-server mysql-community-server/data-dir select ''; \
		echo mysql-community-server mysql-community-server/root-pass password ''; \
		echo mysql-community-server mysql-community-server/re-root-pass password ''; \
		echo mysql-community-server mysql-community-server/remove-test-db select false; \
	} | debconf-set-selections \
	&& apt-get update && apt-get install -y --force-yes mysql-server="${MYSQL_VERSION}" && rm -rf /var/lib/apt/lists/* \
	&& rm -rf /var/lib/mysql && mkdir -p /var/lib/mysql /var/run/mysqld \
	&& chown -R mysql:mysql /var/lib/mysql /var/run/mysqld \
	&& chmod 777 /var/run/mysqld

RUN	apt-get update && apt-get install -y \
	git \
	mongodb-server \
	apache2 	

 #RUN \
 #  echo "mysqld_safe &" > /tmp/config && \
 #  echo "mysqladmin --silent --wait=30 ping || exit 1" >> /tmp/config && \
 #  echo "mysql -e 'GRANT ALL PRIVILEGES ON *.* TO \"root\"@\"%\" WITH GRANT OPTION;'" >> /tmp/config && \
 #  bash /tmp/config && \
 #  rm -f /tmp/config  	

EXPOSE 80 3306
CMD ["mysqld"]

# Install docker on your host. www.docker.com
# Copy the dockerfile to a DIR and cd to this DIR chmod 777 *
# To Build the image from the dockerfile run - docker build -t docker_dbsrv .
# To view the image you created run - docker images
# To run the newly created image - docker run docker_dbsrv
# To delete the image run - docker rmi --force docker_dbsrv
# To shutdown the container run - docker ps , then run - docker stop *containername*