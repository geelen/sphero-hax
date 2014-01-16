'use strict';

var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-RYP-RN-SPP' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(my) {
    var on = false,
      metaDirection = 'forward',
      t = 0,
      period = 10,
      amplitude = 2;

    every((0.2).second(), function() {
      // flash light
      if (on) {
        my.sphero.setColor("blue");
        on = false;
      } else {
        my.sphero.setColor('green');
        on = true;
      }

      console.log(metaDirection)
      if (metaDirection == 'stopped') {
        my.sphero.roll(0, 0);

      } else {
        var incrementT, angleOffset;
        if (metaDirection == 'forward') {
          incrementT = 1;
          angleOffset = 0;
        } else {
          incrementT = -1;
          angleOffset = 180;
        }

        var tRadians = t * Math.PI / 2;
        var angle = 180 * Math.atan(amplitude * Math.cos(amplitude * tRadians / period));
        var direction = (angleOffset + 450 + Math.floor(angle / Math.PI)) % 360;
        console.log([t, angle, direction])

        my.sphero.roll(60, direction);
        t = t + incrementT;
      }
    });

    var metaMetaDirection = 0;
    every((1).second(), function () {
      if (metaMetaDirection % period == 0) {
        metaDirection = 'stopped';
      } else {
        var phase = Math.floor(metaMetaDirection / period);
        if (phase % 2 == 0) {
          metaDirection = 'forward';
        } else {
          metaDirection = 'backward';
        }
      }
      metaMetaDirection++;
    })
  }
}).start();
