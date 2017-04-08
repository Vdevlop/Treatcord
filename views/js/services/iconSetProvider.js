app.service('iconSetProvider',function(){
      
      var self=this;

       var getSpritepos=function(_x,_y){
                    return _x*-43+'px '+_y*-53+'px ';

      }
       self.cssSprite=[
            { mime_type:'^(image)',
              pos:getSpritepos(2,0) },
              
            { mime_type:'application/vnd.openxmlformats',
              pos:getSpritepos(0,0) },
              
            { mime_type:'application/pdf',
              pos:getSpritepos(3,0) },
              
            { mime_type:'application/xml',
              pos:getSpritepos(0,1) }];


     
      self.findSpriteElement=function(fileMime){
       
        for(i in self.cssSprite)
          if(RegExp(self.cssSprite[i].mime_type).test(fileMime))
           return self.cssSprite[i];
        return self.cssSprite[1];

      }
     
                    

});