app.controller('openPatientCtrl',function($rootScope,$http, $document,$scope,$mdColors,$mdDialog,PatientInfo,PatientBuffer,Animations){



      $scope.winClose=function(){
        remote.getCurrentWindow().close();
      }
      $scope.editMode=false;
      $scope.animServ=Animations;
      $scope.mdColors=$mdColors;
      $scope.pserv=PatientBuffer;
      PatientBuffer.getCitiesJSON().then(function(res){
        PatientBuffer.states=res.data;
      });
      $scope.nowDateTime=new Date();

      $scope.pserv.setPatient(PatientInfo);

      $scope.$on('$includeContentLoaded',function(){
        PatientBuffer.loading=false;
      });

      $scope.close=function(){
            $mdDialog.hide();
      };
      
      $scope.cancel=function(){
            $mdDialog.cancel();
      };

      $scope.update=function(){
                  var pid=PatientInfo[0]._id;
                  $scope.pserv.sendMultipart('update',pid) .then(function(res){alert('yppi wotker')},function(err){});
                  $scope.pserv.sendNewSymptoms(pid)
                        .then(function(res){},function(err){});
                          //if(!pserv.NewPrescriptionInfo)
                  $scope.pserv.sendNewPrescription(pid)
                        .then(function(res){},function(err){});
                  $mdDialog.hide();
      };

      
      
    
}); 
