
const ip = 'http://172.16.6.26/';
const parseApiUrl = ip+'api/v1/recipe-builder/scrape/';
// const parseApiUrl = 'http://localhost/nutri/parse';
// const parseApiUrl = 'https://add80281.ngrok.io/scrape';
const measureUrl = (id)=>`${ip}api/v1/master_food/${id}/measures/?limit=100`;
const foodSearchUrl = (q) => `${ip}api/v1/master_food/ingr_search/?username=akhil%40healthifyme.com&exclude=R&search_term=${q}&api_key=b6b2d0b2fb99ce157f69059566548b0ff770d00e`;
const postRecipeUrl = '';

var app = angular.module('nutri',['ngMaterial','ngMessages','angucomplete-alt'])
.controller('nutriCtr',function($scope,$http){
  $scope.pageUrl = window.location.href;
  $scope.parsedData = {}
  $scope.mainLoader =  false;
  $scope.mainError = false;

  chrome.tabs.getSelected(null,function(tab) {
    $scope.pageUrl= tab.url;
    fetchInitialData();
  });
  $scope.delete = function (item) {
    const itemIndex = $scope.parsedData.matched.findIndex(elem=>item.food_id === elem.food_id)
    $scope.parsedData.matched.splice(itemIndex,1);
  }

 $scope.selectedObject = function (params) {
   if(params){
     $scope.selectedItemFromSearch = params;
     getMeasureForSearch(params.description);
   }


 }
  $scope.remoteUrlRequestFn = (url)=>{
    console.log(url);
    return url;
  }

  $scope.getItems = function name() {
    return $scope.searchList
  }


  function fetchInitialData(){
    $scope.mainLoader = true;
    $http({
      url:parseApiUrl,
      method:'POST',
      data:{
        url:$scope.pageUrl
      }
    }).then(res=>{  
      $scope.mainError = false;
      $scope.mainLoader = false;
      $scope.parsedData =res.data.processed_data;
      const searchrTerms_a = $scope.parsedData.matched.map(x=>x.food_name);
      const searchrTerms_b = $scope.parsedData.missing.map(x=>x.food_name);
      
      sendMessageToContent([...searchrTerms_a,...searchrTerms_b]);


      getMeasuresForMatched();
    }).catch(e=>{
      $scope.mainLoader = false;
      $scope.mainError = true;
    })
  }

  function getMeasuresForMatched(){
    $scope.parsedData.matched.forEach(item=>{
      $http({
        url:measureUrl(item.food_id),
        method:'GET'
      }).then((res)=>{
        item.measuresAvaiable = res.data.objects
        if(item.measure_id){
          const measure = item.measuresAvaiable.find(el => el.id === item.measure_id);
          item.selectedMeasure = measure.id || null
        } else {
          item.selectedMeasure = null;
        }
      }).catch(e=>{
        item.measuresAvaiable = []
      })
    })
  }

  function fetchSearch(text){
    $http({
      url: foodSearchUrl(text),
      method:'GET',
    }).then(x=>{
      $scope.searchList = (x.data.search_result);
    }).catch(x=>{
      console.log(x);
    })
  }
  function getMeasureForSearch(item){
    if(item){
      $http({
        url:measureUrl(item.id),
        method:'GET'
      }).then((res)=>{
        item.measuresAvaiable = res.data.objects
        item.selectedMeasure =  null
        $scope.parsedData.matched.push({
          food_id: item.id,
          food_name:item.label,
          matched_food_name:item.label,
          selectedMeasure:null,
          measure_id:null,
          measure_name:null,
          measuresAvaiable:item.measuresAvaiable,
          quantity:0,
          selectedMeasure:null
        });
        $scope.selectedItemx = {};
        $scope.searchTextx = '';
      }).catch(e=>{
        item.measuresAvaiable = []
      })
    }
  }


})

function sendMessageToContent(message){
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
      tabs[0].id,
      {from: 'popup', subject: 'search' , 'message': message},
      // ...also specifying a callback to be called 
      //    from the receiving end (content script)
      );
    });
  }

