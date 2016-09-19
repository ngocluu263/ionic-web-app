/**
 * Created by yiming on 16/9/7.
 */
angular.module('starter')

  .controller('carInsuranceController',function($scope,$state,$http, $location,
                                                $rootScope,$ionicActionSheet,$ionicModal){

    $scope.tabIndex=0;

    $scope.tab_change=function(i) {
      $scope.tabIndex=i;
    };

    $scope. modal_tab_change=function(i) {
      $scope.modalTabIndex=i;
    };



    //选择公司
    $scope.companys=[
      {name:"太平洋保险"},{name:"平安保险"},{name:"新华保险"},
      {name:"太平洋保险"},{name:"太平洋保险"},{name:"太平洋保险"},
      {name:"太平洋保险"},{name:"太平洋保险"},{name:"太平洋保险"}
      ];
    $scope.company={name:"选择公司"};
    //公司选择
    $scope.selectCompany=function(companyName){

      $scope.company.companyName=companyName;
      $scope.apply();
      $scope.closeCompanyModal();

    }


    //选择车辆人员责任险模态框

    /*** bind special_tab_modal ***/
    $ionicModal.fromTemplateUrl('views/modal/special_tab_modal.html',{
      scope:  $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.special_tab_modal = modal;
    });

    //待定
    $scope.openSpecialModal= function(){
      $scope.special_tab_modal.show();
    };


    $scope.closeSpecialModal= function() {
      $scope.special_tab_modal.hide();
    };
    /*** bind special_tab_modal ***/

    $scope.toggle=function(item,field,options)
    {
      if(options!==undefined&&options!==null)
      {
      }else{
        if(item[field]==true)
          item[field]=false;
        else
          item[field]=true;
      }
    }

    $scope.go_back=function(){
      window.history.back();
    }

    $scope.actionSheet=function(item,sourceField,acts)
    {
      console.log('...');
      if (item[sourceField] !== undefined && item[sourceField]!== null && item[sourceField].length > 0)
      {
        var buttons=[];
        item[sourceField].map(function(li,i) {
          buttons.push({text: li});
        });
        $ionicActionSheet.show({
          buttons:buttons,
          titleText: '选择你的保额',
          cancelText: 'Cancel',
          buttonClicked: function(index) {
            acts.map(function (act, i) {
              if(act.indexOf('=>')!=-1)
              {
                var dest=act.split('=>')[1];
                var src=act.split('=>')[0];
                item[dest]=item[src][index];
              }
            });
            return true;
          },
          cssClass:'motor_insurance_actionsheet'
        });
      }
      else
      {}
    }







    /**************方案详情模态框*************************/
    $ionicModal.fromTemplateUrl('views/modal/car_detail_modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.car_detail_modal = modal;
    });
    $scope.openModal = function() {
      $scope.car_detail_modal.show();
    };
    $scope.closeModal = function() {
      $scope.car_detail_modal.hide();
    };
    /**************方案详情模态框*************************/


    /**************选择公司模态框*************************/
    $ionicModal.fromTemplateUrl('views/modal/car_company_modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.car_company_modal = modal;
    });
    $scope.openCompanyModal = function() {
      $scope.car_company_modal.show();
    };
    $scope.closeCompanyModal = function() {
      $scope.car_company_modal.hide();
    };
    /**************选择公司模态框*************************/



    /**
     * 获得险种套餐
     */
    $http({
        method: "POST",
        url: "/proxy/node_server/svr/request",
        headers: {
          'Authorization': "Bearer " + $rootScope.access_token
        },
        data:
        {
          request:'getCarInsuranceMeals'
        }
      }).then(function(response) {
      var data=response.data;
      var meals=[];
      data.data.map(function(meal,i) {
        var products={};
        meal.products.map(function(product,j) {
          if(products[product.productName]==undefined||products[product.productName]==null)
          {
            products[product.productName]=product;
          }
          else
          {
            if(products[product.productName].productIds!==undefined&&products[product.productName].productIds!==null)
            {}else{
              products[product.productName].productIds=[];
              products[product.productName].insuranceTypes=[];
              products[product.productName].productIds.push(products[product.productName].productId);
              products[product.productName].insuranceTypes.push(products[product.productName].insuranceType);
              products[product.productName].productId=null;
              products[product.productName].insuranceType=null;
            }
            products[product.productName].productIds.push(product.productId);
            products[product.productName].insuranceTypes.push(product.insuranceType);

          }
        });
        meals.push({mealName:meal.mealName,products:products});
      });
      $scope.tabs=meals;

      return $http({
        method: "POST",
        url: "/proxy/node_server/svr/request",
        headers: {
          'Authorization': "Bearer " + $rootScope.access_token
        },
        data:
        {
          request:'getInsuranceCompany'
        }
      });
    }).then(function(res) {
      var data=res.data;
      //选择公司
      $scope.companys=data.data;
    }).catch(function(err) {
      var str='';
      for(var field in err)
      str+=err[field];
      alert('error=\r\n'+str);
    });





    $scope.apply=function(){
      switch($scope.tabIndex)
      {
        case 0: //基础套餐
        case 1: //建议套餐
          var flag=true;
          var meals = $scope.tabs[$scope.tabIndex];
          var selected=meals.insurances.map(function(meal,i) {
              if(meal.price!==undefined&&meal.price!==null)
                return meal;
              else
              {
                flag=false;
                  return null;
              }
          });

          if(flag!=true){
            alert('请填写完成您的套餐选择');
          }else{
              //TODO:pass the meals to next step
           $state.go('car_orders',{selected:JSON.stringify(selected)})


          }

          break;
        case 2: //自定义套餐
          var meals=$scope.basic_meal.map(function(meal,i) {
            if(meal.checked==true)
              return meal;
          });

          if(flag!=true){
            alert('请填写完成您的基础套餐');
          }else{
            //TODO:pass the meals to next step
          }

          break;
        default:
          break;
      }
    }



  });

