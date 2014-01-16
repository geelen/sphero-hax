var Cylon = require('cylon');
 
Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-RRG-AMP-SPP' },
  device: { name: 'sphero', driver: 'sphero' },
 
  work: function(my) {
    var on = false;
    every((1).second(), function() {
      // flash light
      if (on) {
        my.sphero.setColor("blue");
        on = false;
      } else {
        my.sphero.setColor('black');
        on = true;
      }
    });
  }
}).start();