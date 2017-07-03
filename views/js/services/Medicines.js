
const DataManager=require('lowdb');
var dbaccess=require('../config/dbaccess.js');
const db=DataManager(dbaccess.dbFolder+'/MedicineStore.json');
db.defaults({'medicineStore':[]}).write();



var PatientBufferModule = angular.module('Medicines',[])
.service('Medicines',function($http,$filter,$document,$timeout){
        
    var self=this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.querySearch   = querySearch;
    self.medicinesList=[];

    self.medicinesListIsEmpty=function(){
        return (JSON.stringify(self.medicinesList)=='[]')||!self.medicinesList;
    }

    self.removeMedicine=function(name,index)
    {
         angular.element($document[0].querySelector('#'+'medicineListItem'+'_'+index)).removeClass('animated fadeIn').addClass('animated fadeOut');
         console.log('#'+'medicineListItem'+'_'+index);
         self.medicinesList.splice(index,1);
        $timeout(function(){
             angular.element($document[0].querySelector('#'+'medicineListItem'+'_'+index)).removeClass('animated fadeOut').addClass('animated fadeIn');
         },700);
    }



    self.addMedicine = function()
    {
        if(self.searchText)
        {
        self.medicinesListOpen=true;
        self.medicinesList.unshift({"name":self.searchText,"morning":true,"afternoon":true,"night":true,"dose":3});
        if(db.getState().medicineStore.indexOf(self.searchText)==-1)
        db.get('medicineStore').push(self.searchText).write();
        self.selectedItem=undefined;
        self.searchText=undefined;
        }
    };

    // ************************************************************************************* //
    //                                  Internal methods
    // ************************************************************************************* //
    
    function querySearch (query) {
      var results = loadAll();
     return results;
    }

    function loadAll() {
      console.log(JSON.stringify( db.getState()));
      return db.getState().medicineStore.map( function (key) {
        return {
          value: key,
          display: key
        };
      });
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }
  }
     

);