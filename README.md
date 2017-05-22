# ng-pagination
Make a pagination from given result. 
Pagination Directive
Pagination directive documentation. Current version: 1.0. There might be still some bugs in it. Tell me if you find anything.

@version 	1.0 as of 2017-05-22
@author	Richard Mauritz

How to use?
It’s pretty easy in use, at least .. that’s what I think. If you have any suggestions, I’m happy to hear is!

You can call the pagination directive by wrapping a <ng-pagination> around you’re data.

There are a few parameters that are required to make the pagination working. You can assign these parameters by placing data attributes.

Required parameters: <ng-pagination data-...>
•	Data-scope=””		The scope which holds the data you want to paginate
•	Data-controller=””	The that belongs to the data scope

Optional parameters: <ng-pagination data-...>
•	Data-page-limit=””	How many items per page? Default is 10
•	Data-pager-buttons=”” How many page buttons to show? Default is 7

The following $scopes are available for use.
•	$scope.Pages		Amount of pages
•	$scope.PagedData	Use this inside the ng-repeat, holds paged data
•	$scope.PrevPage	The previous page
•	$scope.CurrentPage	The current page
•	$scope.NextPage	The next page
•	$scope.Page		Array of pages, use with ng-repeat
•	$scope.FallBackData	No real use, just the original dataset

All these $scopes are available inside the <ng-pagination> directive.

Classes
The following class markup is required.  A default style is already included within the core.less. You can find these under the classes:

•	div.container
•	ul.paging
•	li (no class required, except for the previous and next page buttons)
•	button.prevpage
•	button.nextpage

Make sure the page links are buttons and not a tags.

Within the markup there are also some requirements. These have to be defined to make the buttons working as desired. Give these values by placing following parameters within the paging html.

Required parameters:
•	Data-page=”{{PrevPage}}”	$scope.PrevPage (If you use the previous page option)
•	Ng-click=”DoPaging($event)”	Tells angular a button has been clicked
The $event tells which button has been clicked

Example
See the example below to get the idea.

<ng-pagination data-controller="FailureController" data-scope="allData" data-page-limit="15" data-pager-buttons="7">
    <div ng-repeat="fault in PagedData">
        <div class="col-md-12">{{fault.Item}}</div>
    </div>
    <div class="paging-container">
        <ul class="paging">
            <li><button class="prevpage" data-page="{{PrevPage}}" ng-click="DoPaging($event)"><i class="fa fa-caret-left" aria-hidden="true"></i></button></li>
            <li ng-repeat="page in Pages"><button data-page="{{Page}}" ng-click="DoPaging($event)">{{page}}</button></li>
            <li><button class="nextpage" data-page="{{NextPage}}" ng-click="DoPaging($event)"><i class="fa fa-caret-right" aria-hidden="true"></i></button></li>
        </ul>
    </div>
</ng-pagination>

Demo (source differs from actual source! But mostly the same)
https://jsfiddle.net/o2pzzc61/3/

Notes:
To hide the pagination if there are no pages to show, you can simply do ng-show=”Pages” or ng-if=”Pages”. $scope.Pages will be an empty object if there are no pages to display.

To do:
•	Give .active class to current page
•	Give support to the data-scope to retrieve data also outside a controller (assigning an object or array directly to the data-scope attribute)
•	Support for pagination server side. Use paging-controller.js for now.
•	Support for single template file. If you want to edit the pagination default. You now have to loop through all files where the template is placed, instead of just having a single file with the paging template.
•	We’ll see …
