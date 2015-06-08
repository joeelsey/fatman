// var userBeers, userMiles;
//         // window.currentUser = {
//         //     numberOfBeers: window.currentUser.beers || 0,
//         //     milesRan: window.currentUser.miles || 0
//         // }
//         var dataset = [
//           { label: 'beers', count: 10 }, 
//           { label: 'miles', count: 5 },
//           { label: 'empty', count: 100}
//         ];

//         var width = 300,
//             height = 300,
//             radius = Math.min(width, height) / 2;

//         var color = d3.scale.category20();

//         var pie = d3.layout.pie()
//             .value(function(d) { return d.count; })
//             .sort(null);

//         var arc = d3.svg.arc()
//             .innerRadius(radius - 50)
//             .outerRadius(radius - 20);

//         var svg = d3.select("#donut-chart").append("svg")
//             .attr("width", width)
//             .attr("height", height)
//             .attr("viewBox", "0 0" + " " + height + " " + width)
//             .attr("preserveAspectRatio", "xMidYMid")
//             .append("g")
//             .attr("class", "donut")
//             .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//         var path = svg.selectAll("path")
//             .data(pie(dataset))
//             .enter().append("path")
//             .attr("fill", function(d, i) { return color(i); })
//             .attr("d", arc);

//         var beertext = d3.select("g")
//                      .datum(dataset)
//                      .append("text")
//                      .attr("class", "beer-text")
//                      .attr("id", "beer-text")
//                      .attr("transform", "translate(" + -40 + "," + -30 + ")")
//                      .text(function(p, i) {
//                         var str = p[1].label;
//                         return str.toUpperCase() + ":" + " " + p[1].count;
//                      })
//                      .style("text-align", "center")
//                      .style("fill", "#333");
//         var milestext = d3.select("g")
//                      .datum(dataset)
//                      .append("text")
//                      .attr("class", "miles-text")
//                      .attr("id", "miles-text")
//                      .attr("transform", "translate(" + -40 + "," + 10 + ")")
//                      .text(function(p, i) {
//                         var str = p[0].label;
//                         return str.toUpperCase() + ":" + " " + p[0].count;
//                      })
//                      .style("text-align", "center")
//                      .style("fill", "#333");

//         //resize chart to window
//         var aspect = height / width, chart = $("#donut-chart");
//         $(window).on("resize", function() {
//             var targetWidth = chart.parent().width();
//             chart.attr("width", targetWidth);
//             chart.attr("height", targetWidth / aspect);

//         });