app.controller('addPatientCtrl',function($rootScope,$http, $document,$scope,$mdColors,$mdToast,$mdDialog,PatientBuffer,Medicines,Animations,iconSetProvider,Medicines){

      PatientBuffer.editMode=true;
      $scope.animServ=Animations;
      $scope.mdColors=$mdColors;
      $scope.icons=iconSetProvider;
      $scope.pserv=PatientBuffer;
      $scope.med=Medicines;
      PatientBuffer.getCitiesJSON().then(function(res){
        PatientBuffer.states=res.data;
      });
      $scope.nowDateTime=new Date();




      $scope.close=function(){
            $mdDialog.hide();
      };
      
      $scope.cancel=function(){
            $mdDialog.cancel();
      };

      $scope.create=function(){
              $mdToast.show(
                      {
                            template:'<md-toast>'+
                                          '<div class="md-toast-content">'+
                                           '     Saving '+
                                            '    <div style="padding-right:10px"></div>'+
                                            '   <md-progress-linear ng-if="pService.progress==-1" md-mode="indeterminate"">'+
                                             '</md-progress-linear>'+
                                             '   <md-progress-linear ng-if="pService.progress!=-1" md-mode="determinate" value="{{pService.progress}}">'+
                                          '</md-progress-linear>'+
                                          '</div>'+
                                      '</md-toast>',

                            hideDelay:0,
                            controller:'toastCtrl',
                            position:"top right"
                      }
                        );
                        

              $scope.pserv
              .sendMultipart('add')
              .then(
                    function (response){ 
                          $mdToast.show(
                        {
                            template:'<md-toast>'+
                                          '<div style="color:#bbff90" class="md-toast-content">'+
                                           '    RECORD SAVED '+
                                            '<md-icon style="margin-right:0px;color:#bbff90">done</md-icon>'+
                                          '</div>'+
                                      '</md-toast>',

                            hideDelay:2000,
                            controller:'toastCtrl',
                            position:"top right"
                        }
                        );
                       var count=0;
                    if($scope.pserv.NewPrescriptionInfo||!Medicines.medicinesListIsEmpty()){
                    $scope.pserv.sendNewPrescription(response.data._id)
                        .then(function(res){
                              count++;
                      //  alert(count);
                              if(count==2)
                              {
                                    PatientBuffer.refreshCards();
                                     $mdDialog.hide();
                              }
                        });
                    }
                    else{
                          count++;
                        //  alert(count);
                              if(count==2)
                              {
                                    PatientBuffer.refreshCards();
                                     $mdDialog.hide();
                              }
                    }
                    
                  if($scope.pserv.NewSymptoms){
                    
                         $scope.pserv.sendNewSymptoms(response.data._id)
                        .then(function(res){
                             
                              count++;
                             // alert(count);
                              if(count==2)
                              {
                                    PatientBuffer.refreshCards();
                                     $mdDialog.hide();
                              }
                        });
                  }
                  else{
                      
                       count++;
                      // alert(count);
                              if(count==2)
                              {
                                    PatientBuffer.refreshCards();
                                     $mdDialog.hide();
                              }
                  }

                  
            },
             function(err){
                        $mdToast.show(
                      {
                            template:'<md-toast>'+
                                          '<div style="color:#ffba73 " class=" md-warn md-toast-content">'+
                                           '    RECORD REJECTED '+
                                            '<md-icon style="margin-right:0px;color:#ffba73">close</md-icon>'+
                                          '</div>'+
                                      '</md-toast>',

                            hideDelay:2000,
                            controller:'toastCtrl',
                            position:"top right"
                      }
                        );
                  },function(evt){
                       
                        PatientBuffer.progress= 100.0*evt.loaded/evt.total;
                        console.log(PatientBuffer.progress);
                        if(PatientBuffer.progress>99)
                        {
                              $mdToast.hide();
                        }
                  });
            
      };
      
      
      
    
}); 