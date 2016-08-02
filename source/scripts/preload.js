
import THREE from 'three';

export default {

  start () {

    const assetsByKey = {};

    return new Promise ((resolve, reject) => {

      Promise.all ([

        new Promise ((resolve, reject) => {

          let img = new Image();

              img.onload = function(e) {
                  assetsByKey.img = img;
                  resolve (img);
              };

              img.crossOrigin = "anonymous";
              img.src = "./images/noise-2.png";

          }

        ),

        new Promise ((resolve, reject) => {

          var loader = new THREE.TextureLoader();

              loader.load (
                "./images/ramp-01.png",
                function (texture) {
                  assetsByKey['ramp-01'] = texture;
                  resolve (texture);
                }
              )

          }

        ),

      ]).then ((values) => {

        resolve (assetsByKey);

      });

    });

  }

}

