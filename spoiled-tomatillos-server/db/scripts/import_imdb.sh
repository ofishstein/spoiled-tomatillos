#!/bin/bash
wget -O - https://datasets.imdbws.com/title.basics.tsv.gz | \
gunzip -c | \
grep "	movie	" | \
grep "	0	" | \
cut -d'	' -f1,3,4,6,8 > movieswithoutratings.tsv

wget -O - https://datasets.imdbws.com/title.ratings.tsv.gz | \
gunzip -c | \
cut -d'	' -f1,2 > ratings.tsv

join -t'	' movieswithoutratings.tsv ratings.tsv > movies.tsv

mysqlimport --fields-terminated-by='\t' \
--columns='imdb_id,primary_title,original_title,year,runtime_min,imdb_rating' \
--local \
--host=cs4500-spring2018-fishstein.cxjizgp7es7a.us-west-2.rds.amazonaws.com \
--user=ofishstein \
--password=cs4500db \
cs4500_spring2018_fishstein \
movies.tsv

rm movies.tsv
rm movieswithoutratings.tsv
rm ratings.tsv
