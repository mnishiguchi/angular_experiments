/**
 * Defines blog related components.
 */
(function() {

  // Module declaration.
  angular.module( "blogComponents", [] );


  // --------------------------------------------------------------------------- //
  // --------------------------------------------------------------------------- //


  angular.module( "blogComponents" )
  .directive(
  'blogPosts', function () {

    return {
      restrict: "E",
      scope: {},
      templateUrl: "/views/blog-posts.html",

      controllerAs: "vm",
      controller: ['$scope', '$http', '$log', function( $scope, $http, $log ) {

        var vm    = this;
        var props = $scope.props = $scope;  // Alias for $scope

        // Constants.
        var POSTS_URL = "https://www.googleapis.com/blogger/v3/blogs/" +
          "1351147858586990175/posts?key=AIzaSyAjac0SRkV6lY2-P1syIZ_oI74bCQyFcZU";

        // Initial state.
        vm.posts    = {}; // Bound to the fields.
        vm.loading  = false;

        // Expose the public methods.
        vm.loadBlogPosts = loadBlogPosts;

        // Load posts preview data.
        vm.loadBlogPosts();


        // ---
        // PUBLIC METHODS.
        // ---


        // I fetch blog posts from a public API.
        function loadBlogPosts() {

          // GET request for the info.
          // https://docs.angularjs.org/api/ng/service/$http
          vm.loading = true;

          $http.get(POSTS_URL)
          .then(
            function successCallback(response) {
              vm.loading = false;
              vm.posts   = response.data.items;
              $log.info( vm.posts );
            },
            function errorCallback(response) {
              vm.loading = false;
              $log.error( response.statusText );
            }
          ); // end then
        } // end loadBlogPosts

      }] // end controller
    }; // end return
  }); // end directive


  // --------------------------------------------------------------------------- //
  // --------------------------------------------------------------------------- //


  // I decode paragraphs that include unicode and escape sequence.
  angular.module( "blogComponents" )
  .filter(
    'html', function( $sce ) {

    return function( input ) {
        return $sce.trustAsHtml( input );
    }; // end return
  }); // end filter


  // --------------------------------------------------------------------------- //
  // --------------------------------------------------------------------------- //


  angular.module( "blogComponents" )
  .directive(
  'blogPost', function() {

    return {
      restrict: "E",
      scope: {
        post: "="
      },
      templateUrl: '/views/blog-post.html',

      controllerAs: "vm",
      controller: ['$scope', '$sce', function( $scope, $sce ) {

        var vm    = this;
        var props = $scope.props = $scope;  // Alias for $scope

        // State
        vm.isVisible = false;  // visibility initially false;

        // Set visibility
        vm.toggleVisibility = function() {
          vm.isVisible = !vm.isVisible;
        };

      }] // end controller
    }; // end return
  }); // end directive

})();