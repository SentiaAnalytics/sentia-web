/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
'use strict';
angular.module('linechart', [])
    .directive('linechart', function() {
        return {
            template: '<svg></svg>',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function postLink(scope, element) {
                scope.$watch('data', function() {
                    var data =  [
                        {
                            "time" : new Date("2014-06-03T21:49:36.627Z"),
                            "in" : 0,
                            "out" : 0
                        },
                        {
                            "time" : new Date("2014-06-03T20:49:29.428Z"),
                            "in" : 0,
                            "out" : 0
                        },
                        {
                            "time" : new Date("2014-06-03T19:49:22.240Z"),
                            "in" : 0,
                            "out" : 0
                        },
                        {
                            "time" : new Date("2014-06-03T18:49:15.032Z"),
                            "in" : 85,
                            "out" : 79
                        },
                        {
                            "time" : new Date("2014-06-03T17:49:08.225Z"),
                            "in" : 152,
                            "out" : 124
                        },
                        {
                            "time" : new Date("2014-06-03T16:49:03.295Z"),
                            "in" : 174,
                            "out" : 201
                        },
                        {
                            "time" : new Date("2014-06-03T15:48:57.287Z"),
                            "in" : 64,
                            "out" : 60
                        },
                        {
                            "time" : new Date("2014-06-03T14:48:59.090Z"),
                            "in" : 22,
                            "out" : 22
                        },
                        {
                            "time" : new Date("2014-06-03T13:49:00.927Z"),
                            "in" : 19,
                            "out" : 25
                        },
                        {
                            "time" : new Date("2014-06-03T12:49:02.781Z"),
                            "in" : 20,
                            "out" : 19
                        },
                        {
                            "time" : new Date("2014-06-03T11:49:04.631Z"),
                            "in" : 38,
                            "out" : 25
                        },
                        {
                            "time" : new Date("2014-06-03T10:49:06.488Z"),
                            "in" : 23,
                            "out" : 15
                        },
                        {
                            "time" : new Date("2014-06-03T09:49:08.342Z"),
                            "in" : 18,
                            "out" : 28
                        },
                        {
                            "time" : new Date("2014-06-03T08:49:10.191Z"),
                            "in" : 12,
                            "out" : 18
                        },
                        {
                            "time" : new Date("2014-06-03T07:49:12.045Z"),
                            "in" : 4,
                            "out" : 1
                        },
                        {
                            "time" : new Date("2014-06-03T06:49:13.902Z"),
                            "in" : 0,
                            "out" : 0
                        },
                        {
                            "time" : new Date("2014-06-03T05:49:15.747Z"),
                            "in" : 0,
                            "out" : 0
                        },
                        {
                            "time" : new Date("2014-06-03T04:49:17.608Z"),
                            "in" : 0,
                            "out" : 0
                        },
                        {
                            "time" : new Date("2014-06-03T03:49:19.448Z"),
                            "in" : 0,
                            "out" : 0
                        },
                        {
                            "time" : new Date("2014-06-03T02:49:16.961Z"),
                            "in" : 0,
                            "out" : 0
                        },
                        {
                            "time" : new Date("2014-06-03T01:49:09.748Z"),
                            "in" : 0,
                            "out" : 0
                        },
                        {
                            "time" : new Date("2014-06-03T00:49:02.537Z"),
                            "in" : 0,
                            "out" : 0
                        },
                        {
                            "time" : new Date("2014-06-02T23:48:55.331Z"),
                            "in" : 0,
                            "out" : 0
                        },
                        {
                            "time" : new Date("2014-06-02T22:48:48.130Z"),
                            "in" : 0,
                            "out" : 0
                        }
                    ];
                    data = data.map(function (d) {
                        return {
                            hour : d.time.getHours() + ':00',
                            value : d.in
                        };
                    });

                    var margin = {top: 20, right: 30, bottom: 30, left: 50},
                        width = element.width() - margin.left - margin.right,
                        height = element.height() - margin.top - margin.bottom;

                    var color = d3.scale.category10();

                    var x = d3.time.scale()
                        .range([0, width]);

                    var y = d3.scale.linear()
                        .range([height, 0]);

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom");

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left");

                    var line = d3.svg.line()
                        .interpolate("basis")
                        .x(function(d) { return x(d.time); })
                        .y(function(d) { return y(d.count); });

                    var svg = d3.select(element[0]).select('svg')
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "time"; }));

                    var sets = color.domain().map(function(name) {
                        return {
                            name: name,
                            values: data.map(function(d) {
                                return {time: d.time, count: +d[name]};
                            })
                        };
                    });

                    x.domain(d3.extent(data, function(d) { return d.time; }));
                    y.domain([
                        d3.min(sets, function(c) { return d3.min(c.values, function(v) { return v.count; }); }),
                        d3.max(sets, function(c) { return d3.max(c.values, function(v) { return v.count; }); })
                    ]);

                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
                        .call(xAxis);

                    svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis);
                    var set = svg.selectAll(".set")
                        .data(sets)
                        .enter()
                        .append("g")
                        .attr("class", "set");

                    set.append("path")
                        .attr("class", "line")
                        .attr("d", function(d) { return line(d.values); })
                        .style("stroke", function(d) { return color(d.name); });

                    set.append("text")
                          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                          .attr("transform", function(d) { return "translate(" + width + "," + ((d.name=== 'out') ? 30 : 0) + ")"; })
                          .attr("x", 3)
                          .attr("dy", ".35em")
                          // .style("stroke", function(d) { return color(d.name); })
                          .style("fill", function(d) { return color(d.name); })
                          .text(function(d) { return d.name; });

                });
            }
        };
    });