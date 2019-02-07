const parseApiUrl = 'http://172.16.6.26/scrape';
const measureUrl = (id)=>`https://nutrilab.in/api/v1/master_food/${id}/measures/?limit=100`;
const foodSearchUrl = '';
const postRecipeUrl = '';

var app = angular.module('nutri',['ngMaterial','ngMessages'])
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
    console.log(item);
    const itemIndex = $scope.parsedData.matched.findIndex(elem=>item.food_id === elem.food_id)
    $scope.parsedData.matched.splice(itemIndex,1);
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

