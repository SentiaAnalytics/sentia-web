'use strict';

angular.module('sHeatmap', [])
    .factory('simpleheat', function() {
        /*
    	 (c) 2014, Vladimir Agafonkin
    	 simpleheat, a tiny JavaScript library for drawing heatmaps with Canvas
    	 https://github.com/mourner/simpleheat
    	*/


        function simpleheat(canvas) {
            // jshint newcap: false, validthis: true
            if (!(this instanceof simpleheat)) {
                return new simpleheat(canvas);
            }

            this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

            this._ctx = canvas.getContext('2d');
            this._width = canvas.width;
            this._height = canvas.height;

            this._max = 1;
            this._data = [];
        }

        simpleheat.prototype = {

            defaultRadius: 25,

            defaultGradient: {
                0.4: 'blue',
                0.6: 'cyan',
                0.7: 'lime',
                0.8: 'yellow',
                1.0: 'red'
            },

            data: function(data) {
                this._data = data;
                return this;
            },

            max: function(max) {
                this._max = max;
                return this;
            },

            add: function(point) {
                this._data.push(point);
                return this;
            },

            clear: function() {
                this._data = [];
                return this;
            },

            radius: function(r, blur) {
                blur = blur || 15;

                // create a grayscale blurred circle image that we'll use for drawing points
                var circle = this._circle = document.createElement('canvas'),
                    ctx = circle.getContext('2d'),
                    r2 = this._r = r + blur;

                circle.width = circle.height = r2 * 2;

                ctx.shadowOffsetX = ctx.shadowOffsetY = 200;
                ctx.shadowBlur = blur;
                ctx.shadowColor = 'black';

                ctx.beginPath();
                ctx.arc(r2 - 200, r2 - 200, r, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();

                return this;
            },

            gradient: function(grad) {
                // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    gradient = ctx.createLinearGradient(0, 0, 0, 256);

                canvas.width = 1;
                canvas.height = 256;

                for (var i in grad) {
                    gradient.addColorStop(i, grad[i]);
                }

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 1, 256);

                this._grad = ctx.getImageData(0, 0, 1, 256).data;

                return this;
            },

            draw: function(minOpacity) {
                if (!this._circle) {
                    this.radius(this.defaultRadius);
                }
                if (!this._grad) {
                    this.gradient(this.defaultGradient);
                }

                var ctx = this._ctx;

                ctx.clearRect(0, 0, this._width, this._height);

                // draw a grayscale heatmap by putting a blurred circle at each data point
                for (var i = 0, len = this._data.length, p; i < len; i++) {
                    p = this._data[i];

                    ctx.globalAlpha = Math.max(p[2] / this._max, minOpacity || 0.05);
                    ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
                }

                // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
                var colored = ctx.getImageData(0, 0, this._width, this._height);
                this._colorize(colored.data, this._grad);
                ctx.putImageData(colored, 0, 0);

                return this;
            },

            _colorize: function(pixels, gradient) {
                for (var i = 3, len = pixels.length, j; i < len; i += 4) {
                    j = pixels[i] * 4; // get gradient color from opacity value

                    if (j) {
                        pixels[i - 3] = gradient[j];
                        pixels[i - 2] = gradient[j + 1];
                        pixels[i - 1] = gradient[j + 2];
                    }
                }
            }
        };

        return simpleheat;
    })
    .directive('sHeatmap', ['simpleheat', '$filter',
        function(simpleheat, $filter) {
            return {
                template: '<canvas style="width : 100%; height : 100%"></canvas>',
                restrict: 'E',
                scope: {
                    data: '=',
                    rows : '=',
                    cols : '='
                },
                link: function (scope, element) {
                    scope.$watch('data', function() {
                        var canvas = element.find('canvas')[0],
                            rows,cols,
                            data;

                        if (!scope.data) {
                            return;
                        }
                        data = scope.data.map(function (item) {
                            return [item.x * 10, item.y * 10, item.heat];
                        });
                        cols = scope.cols*10;
                        rows = scope.rows*10;
                        canvas.width = cols;
                        canvas.height = rows;
                        if(cols!== 0 && rows !== 0) {
                            simpleheat(canvas)
                                .radius(10,10) // 25,35
                                .max(300)
                                .data(data)
                                .draw();
                        }
                    });
                }

            };
        }
    ]);