angular.module('starter')

  .controller('dashboardController',function($scope,$state,$http, $location,
                                             $rootScope,$ionicModal,$timeout,
                                             $cordovaCamera,ionicDatePicker,
                                             $ionicActionSheet,$ionicPopup,$q,$cordovaFile,
                                             BaiduMapService,$ionicLoading,$cordovaMedia,$cordovaCapture){


    //生成验证码
    // $http({
    //   method: "post",
    //   url: "/proxy/node_server/svr/request",
    //   headers: {
    //     'Authorization': "Bearer " + $rootScope.access_token,
    //   },
    //   data:
    //   {
    //     request:'generateCode'
    //   }
    // }).then(function(res) {
    //   var json=res.data;
    // }).catch(function(err) {
    //   console.log('...');
    // });


    //车辆信息
    $scope.carInfo=
    {};

    $scope.goto=function(url){
      $location.path(url);
    };


    //暂时打住
    //$http({
    //  method: "post",
    //  url: "/proxy/node_server/svr/request",
    //  headers: {
    //    'Authorization': "Bearer " + $rootScope.access_token,
    //  },
    //  data:
    //  {
    //    request:'getCarAndOwnerInfo'
    //  }
    //})
    //  .success(function (response) {
    //    $scope.carInfo=response.carInfo[0];
    //    console.log('success');
    //  })

    $http({
      method: "post",
      url: "/proxy/node_server/svr/request",

      headers: {
        'Authorization': "Bearer " + $rootScope.access_token,
      },
      data:
      {
        request:'getCarAndOwnerInfo'
      }
    })
      .success(function (res) {
        var json=res.carInfo;
        if(json.re==1) {
          var carInfo=json.data[0];
          $scope.carInfo.ownerIdCard=carInfo.ownerIdCard;
          $scope.carInfo.carNum=carInfo.carNum;
          $scope.carInfo.factoryNum=carInfo.factoryNum;
          $scope.carInfo.engineNum=carInfo.engineNum;
          $scope.carInfo.frameNum=carInfo.frameNum;
          $scope.carInfo.issueDate=carInfo.issueDate;
          $scope.carInfo.ownerName=carInfo.ownerName;
        }
        console.log('success');
      })



    //获取寿险列表
    $scope.postLifeInfo=function(){
      $http({
        method: "POST",
        url: "/proxy/node_server/svr/request",
        //url: "http://192.168.1.106/svr/request",
        headers: {
          'Authorization': "Bearer " + $rootScope.access_token,
        },
        data:
        {
          request:'getLifeInsuranceList',
        }
      }).
        success(function (response) {
          $scope.lifeInfo=response.lifeInfo[0];
          console.log('success');
        })
    }


    //use factory to improve
    $scope.datepick = function(item,field){
      var ipObj1 = {
        callback: function (val) {  //Mandatory

          var date=new Date(val);
          var month=parseInt(date.getMonth())+1;
          item[field]=date.getFullYear()+'-'+month+'-'+date.getDate();
        },
        disabledDates: [            //Optional
          new Date(2016, 2, 16),
          new Date(2015, 3, 16),
          new Date(2015, 4, 16),
          new Date(2015, 5, 16),
          new Date('Wednesday, August 12, 2015'),
          new Date("08-16-2016"),
          new Date(1439676000000)
        ],
        from: new Date(1949, 10, 1), //Optional
        to: new Date(2040, 10, 30), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: false,          //Optional
        disableWeekdays: [0],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'popup'     //Optional
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };


    //填写车辆信息的示例图片
    $scope.car={};
    $scope.isShowPicture = false;
    $scope.isShowPicture1 = false;
    $scope.isShowPicture2 = false;
    $scope.isShowPicture3= false;
    $scope.setIsShowPicture = function(){
      $scope.isShowPicture = true;
      $scope.showDemoPicture();
    };
    $scope.setIsShowPicture1 = function(){
      $scope.isShowPicture1 = true;
      $scope.showDemoPicture1();
    };
    $scope.setIsShowPicture2 = function(){
      $scope.isShowPicture2 = true;
      $scope.showDemoPicture2();
    };
    $scope.setIsShowPicture3 = function(){
      $scope.isShowPicture3 = true;
      $scope.showDemoPicture3();
    };

    $scope.showDemoPicture = function() {
      if ($scope.isShowPicture == true) {
        $scope.openDemoModal();
      };
    };
    $scope.showDemoPicture1 = function() {
      if ($scope.isShowPicture1 == true) {
        $scope.openDemoModal1();
      };
    };
    $scope.showDemoPicture2 = function() {
      if ($scope.isShowPicture2 == true) {
        $scope.openDemoModal2();
      };
    };
    $scope.showDemoPicture3 = function() {
      if ($scope.isShowPicture3 == true) {
        $scope.openDemoModal3();
      };
    };

    /*** show demo modal ***/
    $ionicModal.fromTemplateUrl('/views/modal/show_demo_modal.html',{
      scope:  $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.show_demo_modal = modal;
    });

    $scope.openDemoModal= function(){
      $scope.show_demo_modal.show();
    };

    $scope.closeDemoModal= function() {
      $scope.show_demo_modal.hide();
    };
    /*** show demo modal ***/

    /*** show demo modal1 ***/
    $ionicModal.fromTemplateUrl('/views/modal/show_demo_modal1.html',{
      scope:  $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.show_demo_modal1 = modal;
    });

    $scope.openDemoModal1= function(){
      $scope.show_demo_modal1.show();
    };

    $scope.closeDemoModal1= function() {
      $scope.show_demo_modal1.hide();
    };
    /*** show demo modal1 ***/

    /*** show demo modal2 ***/
    $ionicModal.fromTemplateUrl('/views/modal/show_demo_modal2.html',{
      scope:  $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.show_demo_modal2 = modal;
    });

    $scope.openDemoModal2= function(){
      $scope.show_demo_modal2.show();
    };

    $scope.closeDemoModal2= function() {
      $scope.show_demo_modal2.hide();
    };
    /*** show demo modal2 ***/

    /*** show demo modal3 ***/
    $ionicModal.fromTemplateUrl('/views/modal/show_demo_modal3.html',{
      scope:  $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.show_demo_modal3 = modal;
    });

    $scope.openDemoModal3= function(){
      $scope.show_demo_modal3.show();
    };

    $scope.closeDemoModal3= function() {
      $scope.show_demo_modal3.hide();
    };
    /*** show demo modal3 ***/



    /*** bind car modal ***/
    $ionicModal.fromTemplateUrl('/views/modal/bind_car.html',{
      scope:  $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.bind_car_modal = modal;
    });

    $scope.openCarModal= function(){
      $scope.bind_car_modal.show();

    };

    $scope.closeCarModal= function() {
      $scope.bind_car_modal.hide();
    };
    /*** bind car modal ***/


    /*** bind append_insurer_modal 选择投保人模态框***/
    $ionicModal.fromTemplateUrl('views/modal/append_insurer_modal.html',{
      scope:  $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.append_insurer_modal = modal;
    });

    $scope.open_appendInsurerModal= function(){
      $scope.append_insurer_modal.show();
    };


    $scope.close_appendInsurerModal= function() {
      $scope.append_insurer_modal.hide();
    };
    /*** bind append_insurer_modal ***/


    /*** bind append_insuranceder_modal 选择被保险人模态框***/
    $ionicModal.fromTemplateUrl('views/modal/append_insuranceder_modal.html',{
      scope:  $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.append_insuranceder_modal = modal;
    });

    $scope.open_appendInsurancederModal= function(){
      $scope.append_insuranceder_modal.show();
    };

    $scope.close_appendInsurancederModal= function() {
      $scope.append_insuranceder_modal.hide();
    };
    /*** bind append_insuranceder_modal ***/

    /*** bind append_benefiter_modal 选择受益人模态框***/
    $ionicModal.fromTemplateUrl('views/modal/append_benefiter_modal.html',{
      scope:  $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.append_benifiter_modal = modal;
    });

    $scope.open_appendBenifiterModal= function(){
      $scope.append_benifiter_modal.show();
    };

    $scope.close_appendBenifiterModal= function() {
      $scope.append_benifiter_modal.hide();
    };
    /*** bind append_benefiter_modal ***/





    $scope.check_carInfo=function(){
      if($rootScope.car!==undefined&&$rootScope.car!==null)
      {

      }else{
        $timeout(function(){
          $scope.openModal();
        },300);
      }
    };




    $scope.postCarInfo=function(){
      $http({
        method: "POST",
        url: "/proxy/node_server/svr/request",
        //url: "http://192.168.1.106/svr/request",
        headers: {
          'Authorization': "Bearer " + $rootScope.access_token,
        },
        data:
        {
          request:'uploadCarAndOwnerInfo',
          info:$scope.carInfo
        }
      }).
        success(function (response) {
          console.log('success');
        })
    }

    $scope.select_type=function(){
      var carInfo=$scope.carInfo;
      $state.go('car_insurance');
    }



    //1.附件,通过图库
    $scope.pickImage=function(item,field){
      var options = {
        maximumImagesCount: 1,
        width: 800,
        height: 800,
        quality: 80
      };

      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          item[field]=results[0];
          alert('img url=' + results[0]);
        }, function (error) {
          alert("error="+error);
          // error getting photos
        });
    };

    //2.附件,通过照片
    $scope.takePhoto=function(item,field){
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.PNG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageURI) {
        item[field] = imageURI;
        alert('image url=' + item[field]);
      }, function(err) {
        // error
      });
    };

    //添加附件
    $scope.addAttachment=function(item,field)
    {
      $ionicActionSheet.show({
        buttons: [
          {text:'图库'},
          {text:'拍照'}
        ],
        cancelText: '关闭',
        cancel: function() {
          return true;
        },
        buttonClicked: function(index) {

          switch (index){
            case 0:
              $scope.pickImage(item,field);
              break;
            case 1:
              $scope.takePhoto(item,field);
              break;
            default:
              break;
          }
          return true;
        }
      });
    }


    $scope.life_insurance=
    {
      insurer:{},
      insuranceder:{},
      benefiter:{},
      intend:{},
      order:{
        insurer:{},
        insuranceder:{},
        benefiter:{}
      }
    };


    $scope.apply=function () {
      $scope.life_insurance.state = 'pricing';//订单状态是报价中
      $rootScope.life_insurance = $scope.life_insurance;
      $scope.close_lifeModal();
    }


    //车险险种选择
    $scope.specials_apply=function(){
      var specials=[];
      $scope.motor_specials.map(function (special, i) {
        if(special.checked==true)
          specials.push(special);
      });
      if(specials.length==0)
        alert("请选择一项险种");
      else{
        //TODO:inject into $rootScope
        $rootScope.specials=specials;
        for(var i=0;i<specials.length;i++){
        delete $rootScope.specials[i].$$hashKey;
        }
      }
    }




    //获取寿险产品
    $http({
      method: "POST",
      url: "/proxy/node_server/svr/request",
      //url: "http://192.168.1.106/svr/request",
      headers: {
        'Authorization': "Bearer " + $rootScope.access_token,
      },
      data:
      {
        request:'getLifeInsuranceProducts',
        info:$scope.carInfo
      }
    }).then(function(res) {
      var data=res.data;
      var life_insurance_products=[];
      if(data.re==1)
      {
        data.data.map(function(record,i) {
          if(record!==undefined&&record!==null)
            life_insurance_products.push(record);
        });
      }else{
      }
      $scope.life_insurances=life_insurance_products;
      return  $http.get("http://202.194.14.106:9030/insurance/project_provide");
    }).then(function (res) {
      if(res.data!==undefined&&res.data!==null)
      {
        var data=res.data;
        var projects=data.projects;
        if(Object.prototype.toString.call(projects)!='[object Array]')
          projects=JSON.parse(projects);
        $scope.motor_specials=projects;
        return true;
      }
      else
        return false;

    }).then(function(re) {
      if(re==true)
      {
        $scope.tabs=[
          {type:'车险',insurances:$scope.motor_specials},
          {type:'寿险',insurances:$scope.life_insurances},
          {type:'维修'},
          {type:'车驾管',
            services:[
              {name:'代办车辆年审',href:''},
              {name:'代办驾驶证年审',href:''},
              {name:'取送车',href:''},
              {name:'接送机',href:''},
              {name:'违章查询',href:''}
            ]
          }
        ];
        return ({re: 1});
      }
    }).then(function(json) {

      if(json.re==1) {
        return  [
          {routineId:'1',routineName:'机油,机滤',routineType:'日常保养'},
          {routineId:'2',routineName:'机油,三滤',routineType:'日常保养'},
          {routineId:'3',routineName:'更换刹车片',routineType:'日常保养'},
          {routineId:'4',routineName:'雨刷片更换',routineType:'日常保养'},
          {routineId:'5',routineName:'轮胎更换',routineType:'日常保养'}
        ];
      }
    }).then(function(res){
      var json=res.data;
      //if(json.re==1) {
      //  $scope.routines=json.data;
      //  $scope.dailys = json.data['日常保养'];
      //}
    }).catch(function (err) {
      console.log('server fetch error');
    });


    //寿险详情展示
    $scope.setDetail=function(item){
      if(item.show_detail!=true)
        item.show_detail=true;
      else
        item.show_detail=false;
    }

    //寿险产品勾选
    $scope.toggle_lifeinsurance_product=function(item){
      //如果本次行为为寿险选中,则
      if($scope.life_insurance.product!==undefined&&$scope.life_insurance.product!==null)
      {
        if($scope.life_insurance.product.productId==item.productId)
            $scope.life_insurance.product=null;
        else
          $scope.life_insurance.product=item;
      }else{
        $scope.life_insurance.product=item;
        $state.go('life_insurance_detail',{insurance:JSON.stringify(item)});
      }
    }

    $scope.detail_ref=function(insurance){
      switch($scope.tabIndex)
      {
        case 0:
              break;
        case 1:
          $state.go('life_insurance_detail',{insurance:JSON.stringify(insurance)});
              break;
        default:
              break;
      }
    }

    //寿险意向被保险人选择
    $scope.lifeInsuranceder_gender_select=function(item,prices) {
        var buttons=[{text:'男'},{text:'女'}];
        $ionicActionSheet.show({
          buttons:buttons,
          titleText: '选择被保险人性别',
          cancelText: '取消',
          buttonClicked: function(index) {
            $scope.life_insurance.insuranceder.gender = buttons[index].text;
            return true;
          },
          cssClass:'motor_insurance_actionsheet'
        });
    }

    //寿险状态查询
    $scope.lifeInsuranceStateQuery=function(){
      $http({
        method: "POST",
        url: "/proxy/node_server/svr/request",
        headers: {
          'Authorization': "Bearer " + $rootScope.access_token,
        },
        data:
        {
          request:'getOrderState',
          orderId:orderId
        }
      }).then(function(res) {
        var data=res.state;
        if(data==3)
        {


        }
      }).catch(function(err) {
        var str='';
        for(var field in err)
          str += field + ':' + err[field];
        alert('error=\r\n' + str);
      });
    }



    //获取寿险订单状态
    $scope.getLifeOrderState=function(){
      $http({
        method: "POST",
        url: "/proxy/node_server/svr/request",
        headers: {
          'Authorization': "Bearer " + $rootScope.access_token,
        },
        data:
        {
          request:'getLifeOrderState',
          orderId:orderId
        }
      }).then(function(res) {
        var data=res.state;
        if(data==3)
        {


        }
      }).catch(function(err) {
        var str='';
        for(var field in err)
          str += field + ':' + err[field];
        alert('error=\r\n' + str);
      });

    }



    //寿险意向保留
    $scope.saveLifeInsuranceIntend=function()
    {
      $scope.life_insurance.order= {
        insurancederId:1,
        insurerId:1,
        benefiterId:1,
        insuranceType:'重疾',
        hasSocietyInsurance:0,
        hasCommerceInsurance:0,
        planInsuranceFee:1000
      };

      $http({
        method: "POST",
        url: "/proxy/node_server/svr/request",
        headers: {
          'Authorization': "Bearer " + $rootScope.access_token,
        },
        data:
        {
          request:'generateLifeInsuranceOrder',
          info:$scope.life_insurance.order
        }
      }).then(function(res) {

        if(res.data!==undefined&&res.data!==null)
        {
          var orderId=res.data.data;
          if(orderId!==undefined&&orderId!==null)
          {
            if($rootScope.lifeInsurance==undefined||$rootScope.lifeInsurance==null)
              $rootScope.lifeInsurance={};
            $rootScope.lifeInsurance.orderId=orderId;
            $state.go('life_insurance_orders',{tabIndex:2});
          }
        }

      }).catch(function(err) {
        var str='';
        for(var field in err)
          str += field + ':' + err[field];
        alert('error=\r\n' + str);
      });
    }


    //车险保额选择
    $scope.price_select=function(item,prices) {
      if (prices !== undefined && prices !== null &&prices.length > 0)
      {
        var buttons=[];
        prices.map(function(price,i) {
          buttons.push({text: price});
        });
        $ionicActionSheet.show({
          buttons:buttons,
          titleText: '选择你的保额',
          cancelText: 'Cancel',
          buttonClicked: function(index) {
            item.price = prices[index];
            return true;
          },
          cssClass:'motor_insurance_actionsheet'
        });
      }
      else
      {}
    }

    //绑定车主信息
    $scope.bind_car=function(){
      $rootScope.carInfo=$scope.carInfo;
      $state.go('car_insurance');
    }



    $scope.service='代办车辆年审';
    $scope.services=[
      '代办车辆年审',
      '代办驾驶证年审',
      '取送车',
      '接送机',
      '违章查询'
    ];

    //维修服务
    $scope.tabIndex=0;
    $scope.tab_change=function(i){
      $scope.tabIndex=i;
    };
    $scope.subTabIndex=0;
    $scope.subTab_change=function(i) {
      $scope.subTabIndex=i;
    };

    $scope.maintain={
      tabs:['日常保养','故障维修','事故维修'],
      tab:'日常保养',
      items:{},
      description:{},//故障文字描述,放在remark字段下
      tabIndex:'',
      serviceType:''//服务项目

    };

    $scope.dailys = [
      {subServiceId:'1',subServiceTypes:'机油,机滤',serviceType:'11'},
      {subServiceId:'2',subServiceTypes:'机油,三滤',serviceType:'11'},
      {subServiceId:'3',subServiceTypes:'更换刹车片',serviceType:'11'},
      {subServiceId:'4',subServiceTypes:'雨刷片更换',serviceType:'11'},
      {subServiceId:'5',subServiceTypes:'轮胎更换',serviceType:'11'}
    ];

    $scope.daily_check=function(item){
      if(item.checked==true)
        item.checked=false;
      else
        item.checked=true;
    }

    $scope.accident = {};
    $scope.accidant_check=function(type)
    {
      $scope.accident.type=type;
    }


    $scope.videoCheck = function (orderId) {
      var deferred = $q.defer();
      if($scope.maintain.description.video!=null&&$scope.maintain.description.video!=undefined)
      {
        var server='http://211.87.225.197:3000/svr/request?' +
          'request=uploadVideo&orderId=orderId&fileName='+$scope.maintain.description.video;
       // var server='http://localhost:3000/svr/request?request=uploadVideo';
        var options = {
          fileKey:'file',
          headers: {
            'Authorization': "Bearer " + $rootScope.access_token
          }
        };
        $cordovaFileTransfer.upload(server, $scope.maintain.description.video, options).then(function(json) {
          if(json.re==1){
            deferred.resolve({re:1});
          }else{
            deferred.reject({re:-1});
          }
        })
      }
      else{
       deferred.resolve({re:1});
      }
      return deferred.promise;
    }

    //提交服务项目,生成服务订单
    $scope.commit_daily=function(){
      var deferred=$q.defer();
      $scope.maintain.subServiceTypes=[];
      $scope.dailys.map(function(daily,i) {
        if(daily.checked==true)
          $scope.maintain.subServiceTypes.push(daily.subServiceTypes);
      });
      if($scope.maintain.estimateTime!==undefined&&$scope.maintain.estimateTime!==null)
      {
        if( $scope.tabIndex==2 && $scope.subTabIndex==0)
        { $scope.maintain.serviceType=11;

        }
        if( $scope.tabIndex==2 && $scope.subTabIndex==1)
        { $scope.maintain.serviceType=12;

        }
        if( $scope.tabIndex==2 && $scope.subTabIndex==2)
        { $scope.maintain.serviceType=13;
          $scope.maintain.subServiceTypes=$scope.accident.type;
        }
        //TODO:apply your selected maintain items

        $http({
          method: "POST",
          url: "/proxy/node_server/svr/request",
          //url: "http://192.168.1.106/svr/request",
          headers: {
            'Authorization': "Bearer " + $rootScope.access_token
          },
          data:
          {
            request:'generateCarServiceOrder',
            info:{
              maintain:$scope.maintain
            }
          }
        }).then(function(res) {
          var json=res.data;
          if(json.re==1) {

            $scope.close_maintenanceTAModal();
            console.log('service order has been generated');
            $scope.videoCheck(json.orderId).then(function(json) {
               if(json.re==1){
                 console.log('u');
               }else
                 deferred.reject({re:-1});
             })
          }
        }).catch(function(err) {
          var str='';
          for(var field in err)
            str+=err[field];
          console.error('error=\r\n' + str);
        });

      }
      return deferred.promise;
    }







    // $scope.commit_daily=function(){
    //   if($scope.maintain.estimateTime!==undefined&&$scope.maintain.estimateTime!==null)
    //   {
    //     var subServiceTypes=[];
    //     $scope.dailys.map(function(daily,i) {
    //       if(daily.checked)
    //         subServiceTypes.push(daily.subServiceId);
    //     });
    //     //TODO:apply your selected maintain items
    //     $http({
    //       method: "POST",
    //       url: "/proxy/node_server/svr/request",
    //       headers: {
    //         'Authorization': "Bearer " + $rootScope.access_token
    //       },
    //       data:
    //       {
    //         request:'generateCarServiceOrder',
    //         info:{
    //           subServiceTypes:subServiceTypes,//日常保养服务项目的具体内容
    //
    //           serviceType:1,
    //           estimateTime:$scope.maintain.estimateTime
    //
    //         }
    //       }
    //     }).then(function(res) {
    //       var json=res.data;
    //       if(json.re==1) {
    //         console.log('service order has been generated');
    //       }
    //     }).catch(function(err) {
    //       var str='';
    //       for(var field in err)
    //         str+=err[field];
    //       console.error('error=\r\n' + str);
    //     });
    //   }
    // }
    //

    //车驾管服务

    //选择车驾管服务项目
    $scope.services=["代办车辆年审","代办行驶证年审","接送机","取送车","违章查询"];
    $scope.service="代办车辆年审";

    $scope.service_select=function(services) {
      if (services !== undefined && services !== null &&services.length > 0)
      {
        var buttons=[];
        services.map(function(service,i) {
          buttons.push({text: service});
        });
        $ionicActionSheet.show({
          buttons:buttons,
          titleText: '选择你的保额',
          cancelText: 'Cancel',
          buttonClicked: function(index) {
            $scope.service = services[index];
            return true;
          },
          cssClass:'motor_insurance_actionsheet'
        });
      }
      else
      {}
    }
    $scope.selectCarInfoByCarNum=function(){
      $http({
        method: "POST",
        url: "/proxy/node_server/svr/request",
        headers: {
          'Authorization': "Bearer " + $rootScope.access_token
        },
        data:
        {
          request:'fetchInsuranceCarInfoByCustomerId'
        }
      }).then(function(res) {
        var json=res.data;
        if(json.re==1) {
          var cars=json.data;
          var buttons=[];
          cars.map(function(car,i) {
            var ele=car;
            ele.text='<b>'+car.carNum+'</b>';
            buttons.push(ele);
          });
          var carSheet = $ionicActionSheet.show({
            buttons: buttons,
            titleText: '<b>选择车辆信息</b>',
            cancelText: 'Cancel',
            cancel: function() {
              // add cancel code..
            },
            buttonClicked: function(index) {
              var car=cars[index];
              //TODO:override default feild
              $scope.carInfo.carNum=car.carNum;
              $scope.carInfo.ownerName=car.ownerName;
              $scope.carInfo.ownerIdCard=car.ownerIdCard;
              $scope.carInfo.issueDate=car.issueDate;
              $scope.carInfo.factoryNum=car.factoryNum;
              $scope.carInfo.engineNum=car.engineNum;
              $scope.carInfo.frameNum=car.frameNum;
              return true;
            },
            cssClass:'center'
          });
        }
      }).catch(function(err) {
        var str='';
        for(var field in err)
          str+=err[field];
        console.error('error=\r\n' + str);
      });
    }

    $scope.actionSheet_show = function() {

      // Show the acti2e1on sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: '<b>Share</b> This' },
          { text: 'Move' }
        ],
        titleText: 'select your favourite project ',
        cancelText: 'Cancel',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          return true;
        },
        cssClass:'center'
      });
    };




    $scope.addresses_select=function(item,field) {

        var buttons=[];
        addresses.map(function(address,i) {
          buttons.push({text: address});
        });
        var address=$scope.address;
        $ionicActionSheet.show({
          buttons:buttons,
          titleText: '选择你的保额',
          cancelText: 'Cancel',
          buttonClicked: function(index) {
            $scope.address = $scope.addresses[index];
            return true;
          },
          cssClass:'motor_insurance_actionsheet'
        });

    }



    $scope.service_persons=['person1','person2','person3'];
    $scope.service_person=$scope.service_persons[0];
    $scope.service_person_select=function(persones) {
      if (persones !== undefined && persones !== null &&persones.length > 0)
      {
        var buttons=[];
        persones.map(function(person,i) {
          buttons.push({text: person});
        });

        $ionicActionSheet.show({
          buttons:buttons,
          titleText: '选择你的服务人员',
          cancelText: 'Cancel',
          buttonClicked: function(index) {
            $scope.service_person = $scope.service_persons[index];
            return true;
          },
          cssClass:'motor_insurance_actionsheet'
        });
      }
      else
      {}
    }




    $scope.lifeInsuranceder_insuranceType_select=function()
    {

        var buttons=[{text:'重疾'},{text:'健康'},{text:'理财'}];
        $ionicActionSheet.show({
          buttons:buttons,
          titleText: '选择你需要的保障',
          cancelText: 'Cancel',
          buttonClicked: function(index) {
            $scope.life_insurance.order.insuranceType = buttons[index].text;
            return true;
          },
          cssClass:'motor_insurance_actionsheet'
        });
    }


    $scope.lifeInsuranceder_relation_select=function(){
      var buttons=[{text:'自己'},{text:'老人'},{text:'子女'},{text:'配偶'}];

      $ionicActionSheet.show({
        buttons:buttons,
        titleText: '选择投保人与被保险人关系',
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          $scope.life_insurance.insuranceder.relation = buttons[index].text;
          return true;
        },
        cssClass:'motor_insurance_actionsheet'
      });
    };


    //添加投保人
    $scope.append_insurer=function(props){
      $scope.ionicPopup(props.title,props.item,props.field,$scope.open_appendInsurerModal);

    }

    //添加被保险人
    $scope.append_insuranceder=function(props){
      $scope.ionicPopup(props.title,props.item,props.field,$scope.open_appendInsurancederModal);

    }

    //添加受益人
    $scope.append_benefiter=function(props){
      $scope.ionicPopup(props.title,props.item,props.field,$scope.open_appendBenifiterModal);

    }



    $scope.Setter=function(type,item,field,cmd){
      switch(type)
      {
        case 'remote':
          $http({
            method: "POST",
            url: "/proxy/node_server/svr/request",
            headers: {
              'Authorization': "Bearer " + $rootScope.access_token,
            },
            data:
            {
              request:cmd
            }
          }).then(function(res) {
            var data=res.data;
            if(data.re==2)
            {
              //var confirmPopup = $ionicPopup.confirm({
              //  title: '<strong>选择投保人?</strong>',
              //  template: '可选人员没有,是否进行添加?',
              //  okText: '添加',
              //  cancelText: '取消'
              //});
              //
              //confirmPopup.then(function (res) {
              //  if (res) {
              //    //TODO:bind new relative customer
              //    $scope.open_appendPersonModal();
              //    $scope.life_insurance.person.perType=1;
              //  } else {
              //    // Don't close
              //  }
              //});



            }else if(date.re==1)
            {
              var buttons=[];
              data.map(function(item,i) {
                buttons.push({text: item});
              });
              $ionicActionSheet.show({
                buttons:buttons,
                titleText: '',
                cancelText: '取消',
                buttonClicked: function(index) {
                  $scope[item][field] = buttons[index].text;
                  return true;
                },
                cssClass:'motor_insurance_actionsheet'
              });
            }else{}

          }).catch(function(err) {
            var str='';
            for(var field in err)
              str += field + ':' + err[field];
            alert('error=\r\n' + str);
          });
              break;
        default:
          break;
      }
    };




    $scope.ionicPopup=function(title,item,field,cb) {

      var buttons=[];
      if(Object.prototype.toString.call(cb)=='[object Array]')
      {
        buttons.push({text: '<b>取消</b>', type: 'button-assertive'});
        cb.map(function(item,i) {
          buttons.push({text: item.text, type: 'button-positive', onTap: item.cb});
        });
      }else{
        buttons=[
          {
            text: '<b>取消</b>',
            type:'button-assertive'
          },
          {
            text: '<b>自己</b>',
            type: 'button-positive',
            onTap: function(e) {
              item[field]='self';
            }
          },
          {
            text: '<b>添加</b>',
            type: 'button-positive',
            onTap: function(e) {
              cb();
              //$scope.open_appendPersonModal();
              //$scope.life_insurance.person.perType=1;
            }
          }
        ];
      }

      var myPopup = $ionicPopup.show({
        template: '可选人员没有,是否进行添加',
        title: '<strong>选择投保人?</strong>',
        subTitle: '',
        scope: $scope,
        buttons: buttons
      });

      myPopup.then(function(res) {
        console.log('...');
      });
    };

    $scope.life_insurance.person=
    {};



    $scope.getBin=function(item,field){
      var deferred=$q.defer();
      var absPath=item[field];
      var isAndroid = ionic.Platform.isAndroid();
      if(isAndroid)
      {
        if(absPath.indexOf('Android/data/')!=-1)//externalApplicationStorageDirectory
        {
          var re=/Android\/data\/.*?\/(.*)$/.exec(absPath);
          alert('scirror path=\r\n'+re[1]);
          $cordovaFile.readAsBinaryString( cordova.file.externalApplicationStorageDirectory,re[1])
            .then(function (success) {
              alert('read binary of img success');
              deferred.resolve({re:1,data:success});
            }, function (error) {
              // error
              var err = '';
              for (var field in error)
                err += field + ':' + error[field];
              deferred.reject('image read encounter error=\r\n' + err);
            });
        }
      }
      return deferred.promise;
    }

    $scope.detectImg=function(item){
      var deferred=$q.defer();
      for(var field in item)
      {
        //检测是否有图片字段
        var reg=/_img$/;
        if(reg.exec(field))
        {
          $scope.getBin(item,field).then(function(res) {
            var gen_feild=field.replace('_img','Photo');
            var type=null;
            alert(item[field]);
            if(item[field].toString().indexOf('.jpg')!=-1)
              type = 'jpg';
            else if(item[field].toString().indexOf('.png')!=-1)
              type='png';
            else{}
            item[gen_feild]={
              type:type,
              bin:res
            }
            alert('photo field=\r\n' + gen_feild);
            deferred.resolve({re: 1});
          }).catch(function(err) {
            deferred.reject(err.toString());
          });
        }
      }

      return deferred.promise;
    }

    //提交统一函数
    $scope.upload=function(cmd,item){

      $scope.detectImg(item)
        .then(function(json) {
        return  $http({
          method: "POST",
          url: "proxy/node_server/svr/request",
          headers: {
            'Authorization': "Bearer " + $rootScope.access_token,
          },
          data:
          {
            request:cmd,
            info:item
          }
        });
        })
        .then(function(res) {
          alert('...it is back')
        })
        .catch(function(err) {
          var str='';
          for(var field in err)
            str+=err[field];
          alert('error=\r\n' + str);
      });

    }

    //从服务器拉取数据
    /**
     *  1.filter,用于actionSheet展示的字段
     *
     */
    $scope.Select=function(type,filter,data,url,item,fields,failOb) {
      var buttons=[];

      switch (type) {
        case 'remote':
          $http({
            method: "POST",
            url: "proxy/node_server/svr/request",
            headers: {
              'Authorization': "Bearer " + $rootScope.access_token
            },
            data: {
              request: url

            }
          }).then(function (res) {
            var json=res.data;
            json.data.map(function(item,i) {
              var btn=item;
              btn.text = item[filter];
              buttons.push(btn);
            });
            if(buttons.length==0) {
              if(failOb!==undefined&&failOb!==null)
              {
                var cb=failOb.cb;
                cb(failOb.title,item,fields);
              }
            }else{
              $ionicActionSheet.show({
                buttons:buttons,
                titleText: '',
                cancelText: '取消',
                buttonClicked: function(index) {
                  fields.map(function(field) {
                    item[field]=buttons[index][field];
                  });
                  return true;
                },
                cssClass:'motor_insurance_actionsheet'
              });
            }
          });
          break;
        case 'local':
              if(data!==undefined&&data!==null) {
                data.map(function(item,i) {
                  var btn=item;
                  btn.text = item[filter];
                  buttons.push(btn);
                });
              }else{
                if(failOb!==undefined&&failOb!==null)
                {
                  var cb=failOb.cb;
                  cb(failOb.title,item,fields);
                }
              }
          break;
        default:
          break;
      }
    };

    /*** bind select_relative modal ***/
    $ionicModal.fromTemplateUrl('views/modal/select_relative.html',{
      scope:  $scope,
      animation: 'animated '+' bounceInUp',
      hideDelay:920
    }).then(function(modal) {
      $scope.select_relative={
        modal:modal
      }
    });

    $scope.open_selectRelativeModal= function(item,field,matched){
      $scope.select_relative.modal.show();
      if(item!==undefined&&item!==null&&field!==undefined&&field!==null)
      {
        $scope.select_relative.item=item;
        $scope.select_relative.field=field;
        $scope.select_relative.matched=matched;
      }
    };

    $scope.close_selectRelativeModal= function(cluster) {
      if(cluster!==undefined&&cluster!==null)
      {
        cluster.map(function(singleton,i) {
          if(singleton.checked==true)
          {
            if($scope.select_relative.item!==undefined&&$scope.select_relative.item!==null
            &&$scope.select_relative.field!==undefined&&$scope.select_relative.field!==null)
            {
              if($scope.select_relative.matched!==undefined&&$scope.select_relative.matched!==null)
                $scope.select_relative.item[$scope.select_relative.field]=singleton[$scope.select_relative.matched];
              else
                $scope.select_relative.item[$scope.select_relative.field]=singleton;
            }
          }
        });
      }
      $scope.select_relative.modal.hide();
    };
    /*** bind select_relative modal ***/



    $scope.fetchRelative=function(item,field,matched) {
      $http({
        method: "POST",
        url: "proxy/node_server/svr/request",
        headers: {
          'Authorization': "Bearer " + $rootScope.access_token
        },
        data:
        {
          request:'getRelativePersons'
        }
      }).then(function(res) {
        var json=res.data;
        if(json.re==1) {
          $scope.relatives=json.data;
          $scope.open_selectRelativeModal(item,field,matched);
        }
      }).catch(function(err) {
        var str='';
        for(var field in err)
          str+=err[field];
        console.error('error=\r\n' + str);
      });
    };


    $scope.ActionSheet= function (options,item,field,addon_field,url,fail) {
      if((options==null||options==undefined)&&url!==undefined&&url!==null)//远程
      {
        $http({
          method: "POST",
          url: "proxy/node_server/svr/request",
          headers: {
            'Authorization': "Bearer " + $rootScope.access_token
          },
          data:
          {
            request:url
          }
        }).then(function(res) {
          var json=res.data;
          if(json.re==2)
          {
            if(fail!==undefined&&fail!==null)
            {
              var cb=fail.cb;
              cb(fail.title,item,field);
            }
          }else{
            var buttons=[];
            json.data.map(function(item,i) {
              buttons.push({text: item.perName});
            });
            $ionicActionSheet.show({
              buttons:buttons,
              titleText: '',
              cancelText: '取消',
              buttonClicked: function(index) {
                item[field] = buttons[index].text;
                item.perType=index+1;
                if(addon_field!==undefined&&addon_field!==null)
                  item[addon_field]=(index+1);
                return true;
              },
              cssClass:'motor_insurance_actionsheet'
            });
          }
        });
      }
      else{//本地

        var buttons=[];
        options.map(function(item,i) {
          buttons.push({text: item});
        });
        $ionicActionSheet.show({
          buttons:buttons,
          titleText: '',
          cancelText: '取消',
          buttonClicked: function(index) {
            item[field] = buttons[index].text;
            if(addon_field!==undefined&&addon_field!==null)
              item[addon_field]=(index+1);
            return true;
          },
          cssClass:'motor_insurance_actionsheet'
        });
      }
    }

    $scope.Toggle=function(type,item,field)
    {
      switch(type)
      {
        case 'boolean':
          if(item[field]!=true)
            item[field]=true;
          else
            item[field]=false;
          break;
      }
    }

    $scope.Mutex=function(item,field,cluster) {
      if(item[field])
      {
        item[field]=false;
      }
      else{
        item[field]=true;
        cluster.map(function(cell,i) {
            if(cell.carNum!=item.carNum)
                cell[field]=false;
        })
      }
    };

      ////intial BMap service
      //BaiduMapService.getBMap(function(BMap){
      //
      //  /**
      //   * 自身定位
      //   */
      //  var geolocation = new BMap.Geolocation();
      //  geolocation.getCurrentPosition(function(r){
      //    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      //      //var mk = new BMap.Marker(r.point);
      //      //map.addOverlay(mk);
      //      //map.panTo(r.point);
      //      //alert('您的位置：'+r.point.lng+','+r.point.lat);
      //    }
      //    else {
      //      //alert('failed'+this.getStatus());
      //    }
      //  },{enableHighAccuracy: true});
      //
      //});


    $scope.add_op=function(item,field){
      if(item[field]==undefined||item[field]==null)
        item[field]=0;
      item[field]++;
    }

    $scope.minus_op=function(item,field)
    {
      if(item[field]==undefined||item[field]==null)
      {
        item[field] = 0;
        return ;
      }
      if(item[field]>0)
        item[field]--;
    }


    $scope.getLastCarInsuranceOrderSerial=function(){
        $http({
          method: "POST",
          url: "/proxy/node_server/svr/request",
          headers: {
            'Authorization': "Bearer " + $rootScope.access_token,
          },
          data:
          {
            request:'getCurDayOrderNumTest',
            info:{
              type:'carInsurance'
            }
          }
        })
        .then(function(res) {
            alert('...it is back')
          })
        .catch(function(err) {
            var str='';
            for(var field in err) {
              str += err[field];
            }
            alert('err=\r\n' + str);
          });
    }

    /*** bind maintenance_t&a ***/
    $ionicModal.fromTemplateUrl('views/modal/maintenance_t_a.html',{
      scope:  $scope,
      animation: 'animated '+'bounceInUp',
      hideDelay:920
    }).then(function(modal) {
      $scope.maintenance_t_a_modal = modal;
    });

    //提交服务项目
    $scope.open_maintenanceTAModal= function(cb){
      if(cb!==undefined&&cb!==null)
        $scope.maintenance_t_a_modal_cb=cb;
      $scope.maintenance_t_a_modal.show();
    };

    $scope.close_maintenanceTAModal= function() {
      $scope.maintenance_t_a_modal.hide();
      if($scope.maintenance_t_a_modal_cb!==undefined&&
        $scope.maintenance_t_a_modal_cb!==null&&
        Object.prototype.toString.call($scope.maintenance_t_a_modal_cb)=='[object Function]')
      {
        $scope.maintenance_t_a_modal_cb();
      }
    };


    $scope.selfGeoLocation=function(item,field){
      var geolocation = new $scope.bMap.Geolocation();
        $ionicLoading.show({
          template: 'Loading...',
          showBackdrop:true,
          animation:'fade-in'
        });
      geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          //var mk = new BMap.Marker(r.point);
          //map.addOverlay(mk);
          //map.panTo(r.point);
          item[field]={lng:r.point.lng,lat:r.point.lat};
          $scope.$apply();
          $http({
            method: "POST",
            url: "/proxy/node_server/svr/request",
            headers: {
              'Authorization': "Bearer " + $rootScope.access_token,
            },
            data:
            {
              request:'uploadGeolocation',
              info:{
                geolocation:item[field]
              }
            }
          }).then(function(res) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: '',
              template: '您的地理位置已同布'
            });


          }).catch(function(err) {
            var str='';
            for(var field in err)
              str+=err[field];
            console.error('error=\r\n' + str);
            $ionicLoading.hide();
          });

        }
        else {
          alert('failed'+this.getStatus());
        }
      },{enableHighAccuracy: true});
    }

    $scope.pickMaintain=function(){
      $state.go('locate_maintain_nearby');
    }



    /*** bind matching_car_info modal ***/
    $ionicModal.fromTemplateUrl('views/modal/matching_car_info.html',{
      scope:  $scope,
      animation: 'animated '+'bounceInUp',
      hideDelay:920
    }).then(function(modal) {
      $scope.matching_car_info_modal = modal;
    });

    $scope.open_matchingCarInfoModal= function(){
      $scope.matching_car_info_modal.show();
    };

    $scope.close_matchingCarInfoModal= function() {
      $scope.matching_car_info_modal.hide();
    };
    /*** bind matching_car_info modal ***/



    $scope.getCarInfoByCarNum=function(item){
      if($scope.doFilterCarNumFlag)
      {
        $http({
          method: "post",
          url: "/proxy/node_server/svr/request",
          headers: {
            'Authorization': "Bearer " + $rootScope.access_token,
            info:{
              perIdCard:item
            }
          },
          data:
          {
            request:'getCarInfoByCarNum',
            info:{
              carNum:item
            }
          }
        }).then(function(res) {
          var json=res.data;
          if(json.re==1) {
            var confirmPopup = $ionicPopup.confirm({
              title: '',
              template: '匹配车辆信息'
            });
            confirmPopup.then(function(res) {
              if(res)//用户选择匹配车辆信息
              {
                //TODO:inject carInfo
                if(json.data!==undefined&&json.data!==null)
                {
                  var carInfo=json.data;
                  $scope.carInfo.carNum=carInfo.carNum;
                  $scope.carInfo.factoryNum=carInfo.factoryNum;
                  $scope.carInfo.engineNum=carInfo.engineNum;
                  $scope.carInfo.frameNum=carInfo.frameNum;
                  $scope.carInfo.issueDate=carInfo.issueDate;
                  $scope.carInfo.ownerName=carInfo.ownerName;
                }
              }
            });
          }
        }).catch(function(err) {
          var str='';
          for(var field in err)
            str+=err[field];
          console.error('error=\r\n'+str);
        })
      }else{
        if(item!==undefined&&item!==null)
        {
          $scope.doFilterCarNumFlag=false;
          $timeout(function(){
            $scope.doFilterCarNumFlag=true;
          },1000);
        }
      }
    }



    $scope.filterInfoByPerIdCard=function(item) {
      if ($scope.doFilterFlag) {
        $http({
          method: "post",
          url: "/proxy/node_server/svr/request",
          headers: {
            'Authorization': "Bearer " + $rootScope.access_token,
            info: {
              perIdCard: item
            }
          },
          data: {
            request: 'getCarInfoByPerIdCard',
            info: {
              perIdCard: item
            }
          }
        }).then(function (res) {
          var json = res.data;
          if (json.re == 1) {
            var confirmPopup = $ionicPopup.confirm({
              title: '',
              template: '匹配车辆信息'
            });
            confirmPopup.then(function (res) {
              if (res)//用户选择匹配车辆信息
              {
                $scope.cars = json.data;
                $scope.open_matchingCarInfoModal();
              }
            });
          }
        }).catch(function (err) {
          var str = '';
          for (var field in err)
            str += err[field];
          console.error('error=\r\n' + str);
        })
      } else {
        if (item !== undefined && item !== null) {
          $scope.doFilterFlag = false;
          $timeout(function () {
            $scope.doFilterFlag = true;
          }, 1000);
        }
      }
    }

    $scope.startCapture=function(){
      var options = { limit: 3, duration: 15 };
      $cordovaCapture.captureVideo(options).then(function(videoData) {
        // Success! Video data is here

        $scope.maintain.description.video=videoData[0].fullPath;
        $scope.videoData=videoData[0];
      }, function(err) {
        // An error occurred. Show a message to the user
        var str='';
        for(var field in err)
          str+=err[field];
        console.error('error=\r\n' + str);
      });
    }

    $scope.startRecord=function(){

      var src = "audio.mp3";
      $scope.mediaRec =$cordovaMedia.newMedia(src);
      alert('mediarec=\r\n' + $scope.mediaRec);
      $scope.mediaRec.startRecord();

    }

    $scope.stopRecord=function(){
      $scope.mediaRec.stopRecord();
      for(var field in $scope.mediaRec.media) {
        alert('field=' + field);
        alert('data=\r\n' + $scope.mediaRec.media[field]);
      }
    }

    $scope.bind_car_info=function(cluster){
        cluster.map(function(car,i) {
          if(car.checked)
          {
            var carInfo=car;
            $scope.carInfo.ownerIdCard=carInfo.ownerIdCard;
            $scope.carInfo.carNum=carInfo.carNum;
            $scope.carInfo.factoryNum=carInfo.factoryNum;
            $scope.carInfo.engineNum=carInfo.engineNum;
            $scope.carInfo.frameNum=carInfo.frameNum;
            $scope.carInfo.issueDate=carInfo.issueDate;
            $scope.carInfo.ownerName=carInfo.ownerName;
          }
        });
      $scope.close_matchingCarInfoModal();
    }


    $scope.play=function(){
      $scope.mediaRec.play();
    }

  });
