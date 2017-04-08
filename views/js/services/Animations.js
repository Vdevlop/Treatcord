angular.module('AnimationsModule',[]).service('Animations',function(){
    
    var self=this;
    /*************************** Animations Definations *************************************/
    
	  self.TimeAnimateElementIn = function($el) {   
		      $el.removeClass('timeline-hidden');
	          $el.addClass('bounce-in');
      };
	  self.TimeAnimateElementOut = function($el) {
            $el.removeClass('bounce-in');
		    $el.addClass('timeline-hidden');
	  };
      self.FormAnimateElementIn = function($el) {
		      $el.removeClass('animateHidden');
	          $el.addClass("animated fadeInUp");    
	  };
	  self.FormAnimateElementOut = function($el) {
            $el.removeClass("animated fadeInUp");
	        $el.addClass('animateHidden');
  	  };
	  self.animateCardIn = function($el) {
			$el.removeClass('animateHidden');
			$el.addClass("animated fadeInUp");
            
	  };
	  self.animateCardOut = function($el) {
     		$el.removeClass("animated fadeInUp");
			$el.addClass('animateHidden');
	  };
	  
	  self.fadeElementIn=function($el) {
		  
		
			$el.addClass("animated fadeIn");
	  }
	  self.fadeElementOut=function($el) {
		
			$el.addClass('animated fadeOut');
	  }
    /*****************************************************************************************/
    

}); 