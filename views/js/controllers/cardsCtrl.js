



app.controller('cardsCtrl',function($rootScope, $document,$scope,$timeout,$http,$mdColors,$mdDialog,$timeout, $q, $log,PatientBuffer,Animations) {
    var self = this;
    //$scope.patientserv=PatientBuffer;
    self.PatientBufferServ=PatientBuffer;
    PatientBuffer.refreshCards();
    self.cardAnim = Animations;
    self.clickClose=function(){
        remote.getCurrentWindow().close();
    }
    
    /****************************** Dynamic Patient's Search Engine ***********************************/
    var states=[];             
    
    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
    self.states        = states;
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newState = newState;
    self.cardColor=$mdColors.getThemeColor('primary-400-0.05');
  
    

    function newState(state) {
      alert("Sorry! You'll need to create a appointment for the patient \'" + state + "\' first!");
    }; 

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, true);
        return deferred.promise;
      } else {
        return results;
      }
    };

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    };

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    };

    function pushToAutocomplete(PatientName)
    {
      
      var patient_name_obj={ 
                value: PatientName.toLowerCase(),
                display: PatientName
              };
     var index=-1;
     states.findIndex(function(item,i){
       if(item.value===PatientName.toLowerCase())
       index=i;
     });
    
      if(index !== -1 )
      {
        states.splice(index,1);
      }
      states.unshift(patient_name_obj);
    };

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    };
    /********************************************************************************************************/








    /******************************* handling dialog popup events *******************************************/

         self.deletePatient = function(ev,PID,PNAME) {
  
            var confirm = $mdDialog.confirm()
          .title('Delete '+PNAME+'\'s History Permanently? ')
          //.textContent('Are you sure you want to delete '+PNAME+'\'s History?')
          .ariaLabel('remove Patient records')
          .targetEvent(ev)
          .ok('Confirm Delete')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      PatientBuffer.deleteDialogConfirm(PID);
    }, function() {})

    /*
   $mdDialog.show({
          templateUrl:'dialogs/deletePatient.html',
          clickOutsideToClose:false,
          hasBackdrop:true,
          targetEvent:ev,
          fullscreen:false,
          controller:'addPatientCtrl',
          
        })*/
        
        .finally(function(){
              PatientBuffer.refreshCards();
        });

  };

        self.openPatientInfo=function(ev,PatientName,PID){

          pushToAutocomplete(PatientName);
          self.states=states;
            PatientBuffer.loading=true;
          PatientBuffer.getPatient(PID)
        .then(function (res){
  
             $mdDialog.show({
                controller:'openPatientCtrl',
          templateUrl:'forms/openPatient.html',
          clickOutsideToClose:false,
          hasBackdrop:true,
          targetEvent:ev,
          fullscreen:true,
          locals:{
              PatientInfo:res.data
          },
         
          bindToController:true
          
        }).finally(function(){
              PatientBuffer.loading=true;
              PatientBuffer.refreshCards();
              PatientBuffer.clearCache();
        });
        
      },function(err){}); 
    };   




    
      self.addPatientInfo=function(ev){

        $mdDialog.show({
          controller:'addPatientCtrl',
          templateUrl:'forms/addPatient.html',
          
          clickOutsideToClose:false,
          hasBackdrop:true,
          targetEvent:ev,
          fullscreen:true,
        
          bindToController:true
          
          
        })
        .finally(function(){
         
              PatientBuffer.refreshCards();
              PatientBuffer.clearCache();
        });
      };
      /********************************************************************************************************/

});

