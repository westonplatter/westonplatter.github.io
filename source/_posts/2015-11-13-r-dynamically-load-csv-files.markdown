---
layout: post
title: "R - Dynamically Load CSV Files"
date: 2015-11-13 22:54:45 -0700
comments: true
categories: r data-science 
---

I'm creating a set of visualizations using R/RStudio, and I need to load
a handful of CSV files into R as `data.frame`s. The hurdle I overcame
was the question of how to easily and sustainably load the data into R.

I had the option of statically defining a R variable and loading the
corresponding CSV file into it. For example,

{% highlight r %}
temperature <- read.csv("./data_files/temperature.csv")
{% endhighlight %}

This isn't pragmatic since we have to update variable and filename
according to changing data files. The seeming better option is to search
for all CSV files in a directory, and dynamically load their respective data
into dynamically assigned variable names. For example,

{% highlight r %} 
# get all files in the data_files directory
csv_files <- Sys.glob("./data_files/*.csv")

# loop over files
for (file in csv_files) {
  # load the file contents into R
  df = read.csv(file)

  # convert "data_files/temperature.csv" to "temperature" for the variable name
  full_path = strsplit(file, "/")
  paths = full_path[[1]]
  file_name = paths[length(paths)]
  parts = strsplit(file_name, ".", fixed = TRUE)
  var_name = parts[[1]][1]

  # dynamically assign value to to R variaible.
  # ie, "temperature" is a R data.frame
  assign(var_name, df)
}
{% endhighlight %}
