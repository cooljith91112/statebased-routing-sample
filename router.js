$(document).ready(function () {

  var config = {
    enter: function (option) {
      console.log("enter: " + this.name + "; param: " + JSON.stringify(option.param))
    },
    leave: function (option) {
      console.log("leave: " + this.name + "; param: " + JSON.stringify(option.param))
    },
    update: function (option) {
      console.log("update: " + this.name + "; param: " + JSON.stringify(option.param))
    },
  }

  function cfg(o) {
    o.enter = o.enter || config.enter
    o.leave = o.leave || config.leave
    o.update = o.update || config.update
    return o;
  }

  var stateman = new StateMan();

  stateman.state({

    "app": config,
    "app.home": cfg({
      enter: function (option) {
       $.get('home.html', function(template){
          $(template).appendTo($('#renderArea'));
       });
        
      },
      leave: function (option) {
        $('#renderArea').html('');
      }
    }),
    "app.template1": cfg({
      enter: function (option) {
        var param_name = JSON.stringify(option["param"]);
        var param_value = option["param"]["test"];

       $.get('template1.html', function(template){
          $(template).appendTo($('#renderArea'));
          $('#tplparamobj').html(param_name);
          $('#tplparam1').html(param_value);
       });
        
      },
      leave: function (option) {
        $('#renderArea').html('');
      }
    }),
    "app.template2": cfg({
      enter: function (option) {
       $.get('template2.html', function(template){
          $(template).appendTo($('#renderArea'));
       });
        
      },
      leave: function (option) {
        $('#renderArea').html('');
      }
    }),

  }).on("notfound", function () {
    this.go('app.home') // if not found
  }).start();
});