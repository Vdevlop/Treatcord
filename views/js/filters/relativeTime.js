
app.filter('relativeTime',function(){

        return function(convertDate)
        {
              var estmVisitTime=null;
              var subscript="";
              var days= parseFloat( ( (new Date())   - (new Date(convertDate)) )/1000/60/60/24);
        
        if(days != null && convertDate!='' && convertDate!=undefined)
        {

           if(days<1){
          subscript=" hours"
          estmVisitTime=days*24;
          }
          if(days*24<1)
          {
          subscript=" minutes"
          estmVisitTime=days*24*60;
          estmVisitTime=Math.round(estmVisitTime);
          }
          if(days*24*60<1)
          {
          subscript=" seconds"
          estmVisitTime=days*24*60*60;
          estmVisitTime=Math.round(estmVisitTime);
          }
          if(days>=1)
          {
          subscript=" days"
          estmVisitTime=days;
          }
          if(days/30>=1){
          estmVisitTime=days/30;
          subscript=" months"
          }
          if(days/365>=1){
          estmVisitTime=days/365;
          subscript=" years"
          }
        estmVisitTime=Math.round(estmVisitTime*10)/10;
        estmVisitTime=estmVisitTime+subscript+" ago";
        }
        else{
          estmVisitTime="not known"
        }
        return estmVisitTime;
        }
});
  