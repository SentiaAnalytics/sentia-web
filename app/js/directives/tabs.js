/**
 * Flowmap directive
 * @author  Andreas Møller
 * 2014
 */
require('swiper');
angular.module('tabs', [])
  .directive('tabs', function() {
    'use strict';
    return {
      template: '<div class="test"></div><tab-headers></tab-headers><div class="swiper-container"><div class="swiper-wrapper" ng-transclude></div></div>',
      transclude : true,
      restrict: 'E',
      scope : {
        active : '='
      },
      link: function postLink(scope, element) {
        element
          .find('tab-headers')
          .append(element.find('tab-heading'));
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
          scope.active = mySwiper.activeIndex;
          scope.$apply();
        });
      }
    };
  })
  .directive('tab', function() {
    'use strict';
    return {
      template: '<div class="swiper-slide" ng-transclude></div>',
      transclude : true,
      restrict: 'E',
      replace : true
    };
  });
