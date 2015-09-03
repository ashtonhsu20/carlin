//model that is being updated by user
var myModel = Backbone.Model.extend({

  defaults:{
    state:"NY"
  },
  //returns false if everything validates
  //else returns validation messages.
  validate: function(attributes, options) {
    this.errorModel.clear();
    //regex for no numbers in the input
    var regNoNumbers = new RegExp("^([^0-9]*)$");

    if(!regNoNumbers.test(this.get("firstName"))){
      this.errorModel.set({firstName: "Do not use numbers for First Name"});
    }

    if(!regNoNumbers.test(this.get("lastName"))){
      this.errorModel.set({lastName: "Do not use numbers for Last Name"});
    }

    //regex for  Zip code
    if(!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test((this.get("Zip")))){
      this.errorModel.set({Zip: "Not a Valid Zipcode"});
    }

    if (!_.isEmpty(_.compact(this.errorModel.toJSON())))
      return "Validation errors. Please fix.";

   return false;
  }
});


var fields = [ {
    name: "firstName",
    label: "First name",
    control: "input",
    required:  true,
  }, {
    name: "lastName",
    label: "Last name",
    control: "input",
    required:  true,
  },{
    name: "phone",
    label: "Phone",
    control: "input",
    required:  true,
    type: "number",
  },{
    name: "email",
    label: "email",
    control: "input",
    required:  true,
    type:"email",
  },{
    name: "date",
    label: "date",
    control: "input",
    type:"date",
    required: true,
  },{
    name: "street1",
    label: "street1",
    control: "input",
  },{
    name: "street2",
    label: "street2",
    control: "input",
  },{
    name: "state",
    label: "State",
    control: "select",
    required:  true,
    //all abreviations of states
    options :[{label: "AK", value: "AK"},{label: "AL", value: "AL"},{label: "AR", value: "AR"},{label: "AS", value: "AS"},{label: "AZ", value: "AZ"},{label: "CA", value: "CA"},{label: "CO", value: "CO"},{label: "CT", value: "CT"},{label: "DC", value: "DC"},{label: "DE", value: "ME"},
{label: "FL", value: "FL"},{label: "GA", value: "GA"},{label: "GU", value: "GU"},{label: "HI", value: "HI"},{label: "IA", value: "IA"},
{label: "ID", value: "ID"},{label: "IL", value: "IL"},{label: "IN", value: "IN"},{label: "KS", value: "KS"},{label: "KY", value: "KY"},{label: "LA", value: "LA"},{label: "MA", value: "MA"},{label: "MD", value: "MD"},{label: "ME", value: "ME"},{label: "MH", value: "MH"},{label: "MI", value: "MI"},{label: "MN", value: "MN"},{label: "MO", value: "MO"},{label: "MS", value: "MS"},{label: "MT", value: "MT"},
{label: "NC", value: "NC"},{label: "ND", value: "ND"},{label: "NE", value: "NE"},{label: "NH", value: "NH"},{label: "NJ", value: "NJ"},{label: "NM", value: "NM"},{label: "NV", value: "NV"},{label: "NY", value: "NY"},{label: "OH", value: "OH"},{label: "OK", value: "OK"},{label: "OR", value: "OR"},{label: "PA", value: "PA"},{label: "PR", value: "PR"},{label: "PW", value: "PW"},{label: "RI", value: "RI"},
{label: "SC", value: "SC"},{label: "SD", value: "SD"},{label: "TN", value: "TN"},{label: "TX", value: "TX"},{label: "UT", value: "UT"},{label: "VA", value: "VA"},{label: "VI", value: "VI"},{label: "VT", value: "VT"},{label: "WA", value: "WA"},{label: "WI", value: "WI"},{label: "WV", value: "WV"},{label: "WY", value: "WY"}]  ,
  },{
    name: "Zip",
    label: "Zip",
    control: "input",
    required:  true,
    type: "number"
  },{
    id: "submit",
    control: "button",
    label: "Save to server"
  }
];


var form = new Backform.Form({
  el: $("#main"),
  model: new  myModel,
  fields: fields,

}).render();


form.$el.on("submit", function(e) {
  var submit = form.fields.get("submit");

  if (form.model.isValid()){
        submit.set({status:"success", message: ""});
    $(".Success").css("visibility","visible");
  }
  else
    submit.set({status:"error", message: form.model.validationError});

  return false;
});
