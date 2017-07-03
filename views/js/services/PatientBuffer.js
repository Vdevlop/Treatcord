const PATHVAR=require('path');


var PatientBufferModule = angular.module('PatientBufferModule',[])
.service('PatientBuffer',function($http,$filter,$mdDialog,$mdToast,Upload,Medicines){
        
        
        var self=this;
        self.port = 3000;

        
      
        self.restoreMedicinesList=function(){
            Medicines.medicinesList=$filter('orderBy')(self.Prescriptions,'-date')[0].info.medicines.slice(0);
            Medicines.medicinesListOpen=true;
        }
        self.loading=false;
        self.NewSymptoms=[];
       /* 
    self.PatientCards = [{_id:'40A66',name:'Rahul gupta', phone:'555-1276',gender:"M"},
                         {_id:'988GL',name:'Nitin gadkari', phone:'800-BIG-MARY',gender:"M"},
                         {name:'rajnath singh', phone:'555-4321',gender:"F"},
                         {name:'manoher parrikar', phone:'555-5678',gender:"M"},
                         {name:'shri narendar damomodar shamal das modi : he is ma idial dude', phone:'555-5678',gender:"F"},
                         {name:'Amit Shah', phone:'555-8765',gender:"F"},
                         {name:'lakshay garg', phone:'555-5678',gender:"F"},
                         {name:'chako solo wakiya', phone:'555-5678',gender:"F"},
                         {name:'ghajni ammir khna', phone:'555-5678',gender:"F",prescription:{days:9896}}];
    */
      self.progress=-1;
      self.showToast=function(){
        

      }
      self.attachmentsIsEmpty=function(){
        return (JSON.stringify(self.attachments)=='[]')||!self.attachments;
      }
      self.openExt=function(file)
      {
        //console.log(file);
        //alert(JSON.stringify( file));
        //console.log(JSON.stringify( kv));
          remote.shell.openExternal(file.path.dir+'\\'+file.path.base);
      }
      self.states=null;
      
      self.getCitiesJSON=function(){
              return $http.get('forms/assets/cities.json')
              
      }
      self.getState=function()
      {
            var len = self.states.length;
            for(i=0;i<len;i++)
            {
                if(self.states[i].name==self.city_m)
                {
                    var t= self.states[i].state;
                    self.state_m=t;
                    break;
                }
            }
      };
      



        self.setPatient=function(data){
        
        var dataParsed=data[0];
        self.name=dataParsed.name;
        self.age=parseInt( dataParsed.age) ;
        self.gender=dataParsed.gender;
        self.comments=dataParsed.comments;
        self.city_m=dataParsed.city;
        self.state_m=dataParsed.state;
        self.address=dataParsed.address;
        self.phone1=dataParsed.mobile[0];
        self.phone2=dataParsed.mobile[1];
        self.Prescriptions=dataParsed.prescription;
        self.Symptoms=dataParsed.symptoms;
        self.attachments= dataParsed.attachments;
        
       }

        self.clearCache=function(){
        
        self.name=undefined;
        self.age=undefined;
        self.gender=undefined;
        self.comments=undefined;
        self.city_m=undefined;
        self.state_m=undefined;
        self.address=undefined;
        self.phone1=undefined;
        self.phone2=undefined;
        self.Prescriptions=undefined;
        self.Symptoms=undefined;
        self.NewSymptoms=[];
        self.NewPrescriptionInfo=undefined;
        self.editMode=false;
        self.selectedFiles=undefined;
        self.attachments=undefined;
        self.newSymptomInfo=undefined;
        Medicines.selectedItem=undefined;
        Medicines.searchText=undefined;
        Medicines.medicinesList=[];
        Medicines.medicinesListOpen=undefined;
       }


       self.ToggleEditMode=function()
       {
         if(self.editMode==false)
              self.editMode=true;
         else
            self.editMode=false;
       }

        self.deleteDialogConfirm=function(_id){
      
          self.removePatient(_id);
          $mdDialog.cancel();
      
        }
        self.removePatient=function(_id)
        {
            return $http({
                method:'GET',
                url: 'http://localhost:'+self.port+'/patients/'+_id+'/delete'
              })
        }
        self.getPatient=function(_id)
        {
              return $http({
                method:'GET',
                url: 'http://localhost:'+self.port+'/patients/'+_id+'/get'
              })
        }

        self.getPatientCards=function()
        {
             return $http({
                method:'GET',
                url: 'http://localhost:'+self.port+'/cards'
                  })
        }
       self.refreshCards=function()
        {
             self.getPatientCards()
            .then(function(res){
              
               var content = res.data;
                self.PatientCards=content;
            })
        }
       
       
        
        self.NewSymptoms=[];
        
        self.mdForm=null;
        self.newSymptomDate=new Date();
        self.addNewSymptom=function(){
            self.NewSymptoms.unshift({'info': self.newSymptomInfo,'date': self.newSymptomDate});
            self.newSymptomInfo=undefined;
        }; 



      self.sendNewSymptoms=function(_id)
      {
         return $http({
           method:'POST',
           url:'http://localhost:'+self.port+'/patients/'+_id+'/update/symptoms',
           data:self.NewSymptoms
          });
      }
      self.sendNewPrescription=function(_id)
      {
         return $http({
           method:'POST',
           url:'http://localhost:'+self.port+'/patients/'+_id+'/update/followups',
           data:{'info':{'description':self.NewPrescriptionInfo,'medicines':Medicines.medicinesList}}
          });
      }

      self.sendMultipart=function(qstring,_id)
      {
        
         var myFormData={
         'name':self.name,
         'age':self.age,
         'city':self.city_m,
         'gender':self.gender,
         'state':self.state_m,
         'address':self.address,
         'phone1':self.phone1,
         'phone2':self.phone2,
         'comments':self.comments,
         'attachments':self.selectedFiles
         };
         //
         if(qstring=='add')
         return Upload.upload({
            method:'POST',
            url:'http://localhost:'+self.port+'/patients/add',
            data:myFormData,
         }) 
         
        
          else if(qstring=='update')
          return Upload.upload({
            method:'POST',
            url:'http://localhost:'+self.port+'/patients/'+_id+'/update/personals',
            data:myFormData,
          })
      }

     

});