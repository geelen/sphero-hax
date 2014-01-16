var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-BPO-AMP-SPP' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(my) {
    var on = false,
      t = 0,
      period = 6;
    every((0.2).second(), function() {
      var tRadians = t++ * Math.PI / 2;
      var direction = (450 + Math.floor(45 * Math.cos(tRadians / period))) % 360;
      console.log([t, direction])

      // flash light
      if (on) {
        my.sphero.setColor("blue");
        on = false;
      } else {
        my.sphero.setColor('green');
        on = true;
      }
      my.sphero.roll(60, direction);
    });
  }
}).start();
