$(function(){
  $("li[data-url]").click(function() {
            event.stopPropagation();
		        location.href = $(this).attr("data-url");
		 });
     $("span[data-url]").click(function() {
              event.stopPropagation();
   		        location.href = $(this).attr("data-url");

   		 });
       $("a[data-url]").click(function() {
                 event.stopPropagation();
     		        location.href = $(this).attr("data-url");
     		 });
});
