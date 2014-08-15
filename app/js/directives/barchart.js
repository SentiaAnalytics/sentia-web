/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
'use strict';
angular.module('barchart', [])
    .directive('barchart', function() {
        return {
            template: '<svg></svg>',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function postLink(scope, element) {
                scope.$watch('data', function() {

                    if (!scope.data) {
                        return;
                    }
                    var data = scope.data.map(function (d) {
                        return {
                            hour : new Date(d.time).getHours() + ':00',
                            value : d.in
                        };
                    });

                    var margin = {top: 20, right: 20, bottom: 30, left: 40},
                        width = element.width() - margin.left - margin.right,
                        height = element.height() - margin.top - margin.bottom;

                    var x = d3.scale.ordinal()
                        .rangeRoundBands([0, width], 0.1);

                    var y = d3.scale.linear()
                        .range([height, 0]);

                    var xAxis = d3.svg.axis()
                        .innerTickSize(0)
                        .outerTickSize(0)
                        .scale(x)
                        .orient("bottom");

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .innerTickSize(0)
                        .outerTickSize(0)
                        .ticks(4, "");

                    var svg = d3.select(element[0]).select("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    x.domain(data.map(function(d) { return d.hour; }));
                    y.domain([0, d3.max(data, function(d) { return d.value; })]);

                    svg.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis);

                    svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis);

                    svg.selectAll("line.horizontalGrid").data(y.ticks(5)).enter()
                        .append("line")
                        .attr({
                            "class":"horizontalGrid",
                            "x1" : margin.right,
                            "x2" : width,
                            "y1" : function(d){ return y(d);},
                            "y2" : function(d){ return y(d);},
                            "fill" : "none",
                            "shape-rendering" : "crispEdges",
                            "stroke" : "black",
                            "stroke-width" : "1px"
                        });
                    svg.selectAll(".bar")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d) { return x(d.hour); })
                        .attr("width", x.rangeBand())
                        .attr("y", height)
                        .attr("height", 0)
                        .transition()
                        .delay(function (d, i) { return i * 100;})
                        .ease('elastic')
                        .attr("y", function(d) { return y(d.value); })
                        .attr("height", function(d) { return height - y(d.value); })
                        .duration(1200)



                });
            }
        };
    });