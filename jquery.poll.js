(function( $ ){

  $.fn.JQPoll = function( options ) {  

    var $this = $(this)

    var settings = {
      pollOptionClass : '.poll-option',
      checkedClass    : 'checked',
      maxChecked      : 3,
      onSubmit        : function(){},
      resultBox       : '.poll-results',
      resultClass     : 'votes[]',
      resultContainer : '.votes-container',
      sendingRule     : function(){return true},
      afterChange     : function(element){
                          $this.find(settings.resultContainer).empty();
                          element.parent().find("."+settings.checkedClass).each(function(){
                            $this.find(settings.resultContainer).append($("<input type='hidden' name='"+settings.resultClass+"'>").val($(this).text()));
                          });
                        }
    };

    return this.each(function() {        
      if ( options ) { 
        $.extend( settings, options );
      }
      
      
      function _check_option(element){
        if (element.hasClass(settings.checkedClass)){
          element.removeClass(settings.checkedClass);
        }else{
          if (element.parent().find("."+settings.checkedClass).length < settings.maxChecked){
            element.addClass(settings.checkedClass);
          }
        };
        
      };
      
      
      //Binding poll options
      $(this).find(settings.pollOptionClass).each(function(){
        $(this).bind("click", function(event){
          event.preventDefault()
          _check_option($(this));
          settings.afterChange($(this));
        })
      });
      
      $(this).find("input.vote").click(function(){
        return settings.sendingRule();
      });
      
      $(this).find("form").submit(function(event){
        event.preventDefault()
        settings.onSubmit();
      });

    });

  };
})( jQuery );