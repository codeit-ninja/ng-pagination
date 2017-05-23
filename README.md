## ng-pagination
My first `github` project.

![Pagination directive](http://i.imgur.com/AQDVI4F.jpg)

Creates a pagination from an object. As an example. If a object has 1000 items, it will 100 pages from it with 10 items per page.

## Demo
https://jsfiddle.net/o2pzzc61/5/

## Instalation
Requires Angular and jQuery.<br/><br/>
**Angular cdn**
```
https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js
```
**jQuery cdn**
```
https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
```

## How to use?
You can call the pagination directive by wrapping a `<ng-pagination>` around you’re data.

There are a few parameters that are required to make the pagination working. You can assign these parameters by placing `data` attributes.

**Required parameters: `<ng-pagination data-...””>`**
- `Data-scope=””` - **The scope which holds the data you want to paginate**
- `Data-controller=””` - **The controller that belongs to the data scope**

**Optional parameters: `ng-pagination data-...””>`**
- `Data-page-limit=””` - **How many items per page? Default is 10**
- `Data-pager-buttons=””` - **How many page buttons to show? Default is 7 The active page will stay in the middle**

**The following `$scopes` are available to use.**
- `$scope.Pages` - **Amount of pages**
- `$scope.PagedData` - **Use this inside the ng-repeat, holds paged data**
- `$scope.PrevPage` - **The previous page**
- `$scope.CurrentPage` - **The current page**
- `$scope.NextPage` - **The next page**
- `$scope.FirstPage` - **The first page**
- `$scope.LastPage` - **The last page**
- `$scope.Page` - **Array of pages, use with ng-repeat**
- `$scope.FallBackData` - **No real use, just the original dataset**

All these `$scopes` are available inside the `<ng-pagination>` directive.

**Classes:**<br/>
The following class markup is required.  A default style is already included within the style.css. You can find these under the classes:

- **div.container**
- **ul.paging**
- **li** (no class required, except for the previous and next page buttons)
  - **button.prevpage**
  - **button.nextpage**

Within the `HTML` markup there are also some requirements. These have to be defined to make the buttons working as desired. Give these values by placing following parameters within the paging `HTML`.

**Required parameters:**
- `Data-page=”{{PrevPage}}”`	    **`$scope.PrevPage` (If you use the previous page option)**
- `Ng-click=”DoPaging($event)”`	  **Tells `angular` a `button` has been clicked. The `$event` tells which button has been clicked**

## Example
```
<ng-pagination data-controller="TestController" data-scope="TestData" data-page-limit="5" data-pager-buttons="7">
    <div ng-repeat="fault in PagedData">
        <div class="col-md-12">{{fault.Item}}</div>
    </div>
    <div class="paging-container">
        <ul class="paging">
            <li><button class="prevpage" data-page="{{PrevPage}}" ng-click="DoPaging($event)"><i class="fa fa-caret-left" aria-hidden="true"></i></button></li>
            <li ng-repeat="Page in Pages"><button data-page="{{Page}}" ng-click="DoPaging($event)">{{Page}}</button></li>
            <li><button class="nextpage" data-page="{{NextPage}}" ng-click="DoPaging($event)"><i class="fa fa-caret-right" aria-hidden="true"></i></button></li>
        </ul>
    </div>
</ng-pagination>
```

### Notes:
To hide the pagination if there are no pages to show, you can simply do `ng-show=”Pages”` or `ng-if=”Pages”`. `$scope.Pages` will be an empty `object` if there are no pages to display.

### To do:
-	Give support to the `data-scope` to retrieve data also outside a controller (assigning an `object` or `array` directly to the `data-scope` attribute)
-	We’ll see …
