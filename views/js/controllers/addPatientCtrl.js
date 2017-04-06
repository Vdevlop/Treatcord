app.controller('addPatientCtrl',function($rootScope,$http, $document,$scope,$mdColors,$mdDialog,PatientBuffer,Animations){

      PatientBuffer.editMode=true;
      $scope.animServ=Animations;
      $scope.mdColors=$mdColors;
      $scope.pserv=PatientBuffer;
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
              $scope.pserv
              .sendMultipart('add')
              .then(function (response){ 
                    $scope.pserv.sendNewSymptoms(response.data._id)
                        .then(function(res){},function(err){});
                    //if(!pserv.NewPrescriptionInfo)
                    $scope.pserv.sendNewPrescription(response.data._id)
                        .then(function(res){},function(err){});
              },
             function(err){
                   
             })
             $mdDialog.hide();
      };
      
      
      
    
}); 


app.config(function($mdThemingProvider) {

});