/**
     * Pagination directive
     *
     * @author                      Richard Mauritz
     * @version                     v1.0.2
     * @link                        https://github.com/redbullzuiper/ng-pagination
     */
    ang.directive("ngPagination", function ($location, $timeout) {
        return {
            link: function (scope, elem, attrs) {
                /**
                 * Set global instance of the directive
                 */
                var self = this;
                /**
                 * Which scope to watch?
                 */
                var watch = attrs.scope;
                /**
                 * Start of with extracting the data from the directive, given as attributes
                 */
                this.extract = function () {

                    scope.$watch(watch, function (newval, oldval) {
                        if (newval) {
                            /**
                             * Controller which holds all data, required
                             */
                            self.controller = (attrs.controller ? attrs.controller : false);
                            /**
                             * The scope which holds the data to paginate, required
                             */
                            self.dataScope = (attrs.scope ? scope[attrs.scope] : false);
                            /**
                             * PageLimit, default is 10
                             */
                            self.pageLimit = (attrs.pageLimit ? parseInt(attrs.pageLimit) : 10);
                            /**
                             * Set fallback to original data
                             */
                            self.originalData = self.dataScope;
                            /**
                             * How many page buttons to show? Default is 7
                             */
                            self.pagerButtons = (attrs.pagerButtons ? parseInt(attrs.pagerButtons) : 3);
                            /**
                             * Throw error if required params are missing
                             */
                            if (!self.controller) {
                                /**
                                 * Throw message in console
                                 * Angular throws error when param is missing. After that dies;
                                 */
                                throw "[data-controller] is missing.";
                            }
                            if (!self.dataScope) {
                                /**
                                 * Throw message in console
                                 */
                                throw "[data-scope] is missing.";
                            }

                            /**
                             * Goto next step, set globals()
                             */
                            self.globals();
                            /**
                             * Goto next step, prepare()
                             */
                            self.prepare();
                        }
                    });
                }

                /**
                 * Store globals, call function when page changed. Globals have to be up-to-date!
                 */
                this.globals = function () {
                    /**
                     * Amount of pages
                     */
                    scope.PagesCount = Math.ceil(this.dataScope.length / this.pageLimit);
                    /**
                     * Original data
                     */
                    scope.FallBackData = this.originalData;
                    /**
                     * Whats the current page? Default is 1
                     */
                    scope.CurrentPage = ($location.search().page ? $location.search().page : 1);
                    /**
                     * Whats the next page? Current page + 1? :)
                     */
                    scope.NextPage = (parseInt(scope.CurrentPage < scope.PagesCount ? parseInt(scope.CurrentPage) + 1 : scope.CurrentPage))
                    /**
                     * Whats the previous page? Current page - 1? :)
                     */
                    scope.PrevPage = (scope.CurrentPage == 1 ? 1 : (scope.CurrentPage - 1));
                    /**
                     * Whats the first page? 1 of course .. duh
                     */
                    scope.FirstPage = 1;
                    /**
                     * Whats the last page?
                     */
                    scope.LastPage = parseInt(scope.PagesCount);

                    console.log(scope);
                }

                /**
                 * Prepare data
                 */
                this.prepare = function () {
                    /**
                     * Current iteration count
                     */
                    this.iteration = ($location.search().page ? ($location.search().page * this.pageLimit - this.pageLimit) : 0);
                    /**
                     * Set scope for pages
                     */
                    this.pages = [];
                    /**
                     * Set scope for paged data
                     */
                    scope.PagedData = [];
                    /**
                     * Push each page into previous defined scope pages
                     * Use `pages` in `ng-repeat`, eg. `ng-repeat="page in pages"`
                     */
                    for (var i = 0; i < Math.ceil(this.dataScope.length / this.pageLimit) ; i++) {
                        /**
                         * `i + 1` Because i starts at 0
                         */
                        this.pages.push(i + 1);
                    }

                    /**
                     * A iteration i wrote, but have no clue anymore what it exacly does .. :/
                     */
                    for (var i = this.iteration; i < this.pageLimit + this.iteration; i++) {
                        /**
                         * Break if iteration is equal to total
                         */
                        if (i === this.originalData.length) {
                            break;
                        }

                        /**
                         * Insert original data, which is inside the current iteration, into paged data
                         */
                        scope.PagedData.push(scope.FallBackData[i]);
                    }

                    /**
                     * Goto next step pager()
                     */
                    this.pager();
                }

                /**
                 * Calculate the ammount of pages to show, we dont want to list 100+ pages
                 */
                this.pager = function (elm, diggest) {
                    /**
                     * Instance of directive
                     */
                    var self = this;
                    /**
                     * How many before and after active page?
                     */
                    var beforeAfter = parseInt(this.pagerButtons) / 2;
                        beforeAfter = Math.round(beforeAfter);
                    /**
                     * Create empty scope pages
                     */
                    scope.Pages = [];
                    /**
                     * Check if there are more pages than we want to show and less than pages to show before and after the active page
                     */
                    if (this.pages.length > this.pagerButtons && scope.CurrentPage <= beforeAfter) {
                        for (var i = 0; i < this.pagerButtons; i++) {
                            scope.Pages.push(i + 1);
                        }
                    } else
                        /**
                         * If current page greater than pages to show before after active page
                         */
                        if (scope.CurrentPage > beforeAfter) {
                            /**
                             * Prepend 3 values before active page number
                             */
                            for (var i = scope.CurrentPage; i > parseInt(scope.CurrentPage) - beforeAfter; i--) {
                                /**
                                 * Do this using .unshift()
                                 */
                                scope.Pages.unshift(i);
                            }
                            /**
                             * Append 3 values after active page number
                             */
                            for (var i = +scope.CurrentPage + 1; i < +scope.CurrentPage + beforeAfter; i++) {
                                /**
                                 * Remove all array objects after last key
                                 */
                                if (scope.CurrentPage < this.pages.slice(-1)[0] && i <= this.pages.slice(-1)[0]) {
                                    /**
                                     * Add using .push()
                                     */
                                    scope.Pages.push(i);
                                    /**
                                     * Else if last key is visible
                                     */
                                } else {
                                    /**
                                     * Prepend before last key until value before active page number is reached
                                     */
                                    if (scope.Pages.length < this.pagerButtons) {
                                        for (var desc = scope.Pages.length; desc < this.pagerButtons; desc++) {
                                            /**
                                             * Minus 1 in loop until disired length is reached
                                             */
                                            scope.Pages.unshift(scope.Pages[0] - 1);
                                        }
                                    }
                                }
                            }
                        }

                    /**
                     * Fix a bug when there are less pages than this.pagerbuttons, the scope.Pages is empty
                     *
                     * @since v1.0.2
                     */
                    if (scope.Pages.length < 1) {
                        /**
                         * Check if there is a need for pages
                         */
                        if (this.pages.length > 0) {
                            /**
                             * Push into the pages scope
                             */
                            for (var i = 0; i < this.pages.length; i++) {
                                scope.Pages.push(i + 1);
                            }
                        }
                    }

                    /**
                     * Call this.active() function
                     */
                    this.active();
                }

                /**
                 * Handles [disabled] property and .active class
                 */
                this.active = function () {
                    /**
                     * Wait for document ready()
                     * Prevents jQuery from returning null
                     */
                    $(document).ready(function () { 
                        /**
                         * Current page is equal to [data-page]
                         */
                        var elm = "[data-page=" + scope.CurrentPage + "]";
                        /**
                         * Set jQuery object
                         */
                        var jQelm = $(elm);
                        /**
                         * Add .active class to parent and remove from siblings
                         */
                        jQelm.not(".nextpage, .prevpage").parent().addClass("active").siblings().removeClass("active");
                    });

                    /**
                     * Finaly, handle errors and warnings
                     */
                    this.errorHandler();
                }

                /**
                 * Handle errors and warnings
                 */
                this.errorHandler = function () {
                    /**
                     * Check if pagerButtons is even number, throw warning
                     */
                    if (isEven(attrs.pagerButtons)) {
                        console.warn("An even number (" + attrs.pagerButtons + ") isset in [data-pager-buttons], the .active page will not remain in the middle! Use Eg: 3, 7, 9 .. in order to keep it in the middle.");
                    }

                    /**
                     * Check if number is even number
                     *
                     * @return boolean
                     */
                    function isEven(n) {
                        return n % 2 == 0;
                    }
                }

                /**
                 * Initialize, starts the directive
                 */
                this.initialize = function () {
                    /**
                     * Start off with extracting the data
                     */
                    this.extract();
                }

                /**
                 * Start running the directive
                 */
                this.initialize();

                /**
                 * Set click event for pager buttons
                 */
                scope.DoPaging = function ($event) {
                    /**
                     * Get target and target page
                     */
                    var target = $event.target;
                    var target = $(target).closest("button")[0];
                    var targetPage = target.dataset.page;

                    /**
                     * Set / update ?page query
                     */
                    $location.search("page", targetPage);

                    /**
                     * Reinitialize paging directive
                     */
                    self.initialize();
                }
            },
            scope: true,
            restrict: 'AE',
            controller: "@",
            name: "controller",
        };
    });
