/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
require('swiper');
angular.module('swiper', [])
  .directive('swiper', function() {
    'use strict';
    return {
      template: '<div class="swiper-container"><div class="swiper-wrapper" ng-transclude></div></div>',
      transclude : true,
      restrict: 'E',
      scope : {
        active : '='
      },
      link: function postLink(scope, element) {
        var swiperContainer = element[0].getElementsByClassName('swiper-container')[0];
        var mySwiper = new Swiper(swiperContainer,{
          //Your options here:
          mode:'horizontal',
          preventLinksPropagation : true,
          preventLinks : true,
          simulateTouch : false
          //etc..
        });
        scope.$watch('active', function () {
          mySwiper.swipeTo(scope.active, undefined, false);
        });
        mySwiper.addCallback('SlideChangeStart', function(swiper){
          scope.$apply(function () {
            scope.active = mySwiper.activeIndex;
          });
        });
      }
    };
  })
  .directive('swiperSlide', function() {
    'use strict';
    return {
      restrict: 'E',
      link : function (scope, element) {
        element.addClass('swiper-slide');
      }
    };
  });
