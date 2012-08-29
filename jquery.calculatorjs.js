(function( $, undefined ) {

var Calculator  = {
    firstValueSelected:null,
    secondValueSelected:0,
    operatorSelected: null,
    operatorClick:false,
    result :0,
    change:0,
    resultField:null,
    historyPanel:null,

   options:{
       theme:'theme1'

   } ,

    _init:function(){
    this.element.addClass('jq-calc');
    var op = this.options;
    this.element.addClass(op.theme);

         //create an input field
         var textfield=$(document.createElement("input")).attr('type','text').addClass('screen').css('direction','rtl');
         var showHistory = $(document.createElement('div')).addClass('history');
         //hisyory field on the top
         this.element.append(showHistory) ;
         this.historyPanel = showHistory;
        this.element.append(textfield);
        this.resultField=textfield;
         var specialGrp = $(document.createElement("section")).addClass('addition');
         this.element.append(specialGrp);
         var specialButtons = ['MC','MR','MS','M+','M-','CE','+/-','ROOT','%','1/X'];
        for(var k=0;k<specialButtons.length;k++){
        this._renderButtonElement('addition',specialButtons[k], this._handleOperatorClick1,specialGrp );
                             }
        var numberGrp = $(document.createElement("section")).addClass('numbers');
        this.element.append(numberGrp);
        var operatorGrp = $(document.createElement("section")).addClass('operators');
        this.element.append(operatorGrp);
        var numButtons = ['7','8','9','4','5','6','1','2','3','0','.'];
        for(var i=0;i<numButtons.length;i++){

        this._renderButtonElement('number',numButtons[i],this._handleNumberClick,numberGrp);
              }
          //when initializing the class we need to set event
    //listeners on the buttons
          //get the elements by class name and add event listener
           // buttons is an array of the elements retrieved
        var opButtons = ['+','-','*','/'];
         // Handling the operator buttons
        for (var j=0;j<opButtons.length;j++){

            this._renderButtonElement('operator',opButtons[j],this._handleOperatorClick,operatorGrp);
                }
          // Handling Equal button
        this._renderButtonElement('clear','C',this._handleClearClick,operatorGrp);
         // Handling Clear button

        this._renderButtonElement('clear','=', this._handleEqualClick,operatorGrp);

     },
    _renderButtonElement:function(type, value,clickHandler,sectionName){
        var _self=this;
        var btn =
    $(document.createElement("Button")).attr({class:type,value:value}).html(value).bind("click",_self,clickHandler);
         $(sectionName).append(btn);
     },
     _handleOperatorClick1:function(evt){
     },

     _handleNumberClick : function(evt){
          var _this=evt.data;

         var button = evt.target;

         // referring to the target i.e. HTML Button element
         var value = button.value;
          _this.history(value)
          if(_this.operatorClick){
              _this.resultField.val(value);
             _this.operatorClick=false;
          }else{
              //appending the number input
              _this.resultField.val(_this.resultField.val()+value);
          }

      },
      _handleOperatorClick : function(evt){
         // if result exists then its a second operation
         //we need to set the  firstValueSelected and operator
           var _this=evt.data;
           var operatorName = evt.target;
           var operatorValue = operatorName.value;
           _this.history(operatorValue);
           if(_this.firstValueSelected !=null){
                 _this._handleEqualClick(evt);
                 _this.firstValueSelected =this.result;

           }else{

                 _this._clearAndStoreValue(true);
            }
                  //store the value and clear the text field
                  var button = evt.target;
                  var value = button.value;

                  // Retrieving the operator from the target
                  _this.operatorSelected = value;
                  _this.operatorClick = true;
       },
       _clearAndStoreValue: function(isFirstValue){
                   var value = this.resultField.val();
                   // Storing the value entered before
//clearing the screen
                   if(isFirstValue){
                       this.firstValueSelected = Number(value);


                   }else{
                       this.secondValueSelected = Number(value);

                   }
                   this.resultField.val(null);
        },

        _setCalculatedResult : function(){
                   switch(this.operatorSelected){
                   //  appending the operators and the values
                   case '+' :
                   this.result = this.firstValueSelected+this.secondValueSelected;
                     break;
                   case '-' :
                   this.result =this.firstValueSelected-this.secondValueSelected;
                     break;
                   case '/' :
                     this.result = this.firstValueSelected/this.secondValueSelected;
                     break;
                   case '*' :
                    this.result = this.firstValueSelected*this.secondValueSelected;
                     break;
                   }
         },

         _handleEqualClick:function(evt){
                    var _this=evt.data;
                   //store the value and clear the text field
                   _this._clearAndStoreValue(false);
                   _this._setCalculatedResult();
                   //evaluated the values

                   _this.resultField.val(_this.result);

                   _this.operatorClick = true;
//                           _this.history(_this.result);
          },

          _handleClearClick : function(){
                   this.resultField.val(null);
                   // clearing the screen and initializing the
//values of the variables
                   this.firstValueSelected = null;
                   this.secondValueSelected = 0;
                   this.operatorSelected = null;
                   this.result = 0;
                   this.operatorClick=false;
           },

           history:function(value){
//                   $(this.element.showHistory).html(value) ;
            this.historyPanel.html(this.historyPanel.html()+value);
            console.log(value)
           },

        destroy:function(){
             this.element.find('.number').unbind('click');


        },


};
 $.widget("ui.calculator",Calculator);

}(jQuery));

