
import THREE from 'three';
import material from './materials/displacement-basic';

const OrbitControls = require ('three-orbit-controls') (THREE)

function createSpotlight( color ) {

  var newObj = new THREE.SpotLight( color, 2 );

  newObj.castShadow = true;
  newObj.angle = 0.3;
  newObj.penumbra = 0.2;
  newObj.decay = 2;
  newObj.distance = 50;

  newObj.shadow.mapSize.width = 1024;
  newObj.shadow.mapSize.height = 1024;

  return newObj;

}

export default {

  start () {

    console.log ( 'start' );

    var w = window.innerWidth;
    var h = window.innerHeight;

    var renderer = new THREE.WebGLRenderer();
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.setSize ( w, h );

    var camera = new THREE.PerspectiveCamera( 35, w / h, 1, 2000 );
        camera.position.set( 46, 22, - 21 );
        camera.aspect = w / h;
        camera.updateProjectionMatrix();

    var controls = new OrbitControls ( camera, renderer.domElement );
        controls.target.set( 0, 7, 0 );
        controls.maxPolarAngle = Math.PI / 2;
        controls.update ();

    var light_ambient = new THREE.AmbientLight( 0x111111 );

    var light_spot_1 = createSpotlight ( 0xff0000 );
        light_spot_1.position.set ( 0, 20, 20 );
        light_spot_1.penumbra = 0.0;
        light_spot_1.intensity = 1.0;

    var obj_box = (() => {

      var geo = new THREE.BoxGeometry ( 3, 1, 2 );
      var mat = new THREE.MeshPhongMaterial ( { color: 0xaaaaaa } );

      var obj = new THREE.Mesh ( geo, mat );
          obj.castShadow = true;
          obj.receiveShadow = true;
          obj.position.set( 0, 8, 0 );

      return obj;

    })();

    var obj_ico = (() => {

      var geo = new THREE.IcosahedronGeometry ( 2, 3 );
      var mat = material ();

      var obj = new THREE.Mesh ( geo, mat );
          obj.position.set ( 0, 5, 0 );
          obj.receiveShadow = true;
          obj.castShadow = true;

      return obj;

    })();

    var obj_floor = (() => {

      var geo = new THREE.BoxGeometry ( 40, 1, 40 );
      var mat = new THREE.MeshPhongMaterial ( { color: 0x808080 } );

      var obj = new THREE.Mesh ( geo, mat );
          obj.receiveShadow = true;
          obj.position.set( 0, -0.05, 0 );

      return obj;

    })();

    var light_spot_2 = createSpotlight ( 0x00ff00 );
        light_spot_2.position.set ( 20, 40, -20 );
        light_spot_2.penumbra = 1.8;

        /*
    var light_spot_3 = createSpotlight ( 0x0000ff );
        light_spot_3.position.set( -20, 20, 0 );
        */

    var scene = new THREE.Scene();

        scene.add ( obj_floor );
        scene.add ( obj_box );
        scene.add ( obj_ico );

        scene.add ( light_ambient );
        scene.add ( light_spot_1 );
        //scene.add ( light_spot_2 );

    function update() {

      let t = obj_ico.material.uniforms.uTime.value;

      obj_box.rotation.z = Math.sin ( t ) * 0.3;
      obj_box.rotation.x = Math.sin ( t * 1.1 ) * 0.3;
      obj_box.position.y = 8.0 + ( Math.sin ( t * 0.8 ) * 0.5 + 0.5 ) * 2.0;
      obj_box.position.x = 0.0 + ( Math.sin ( t * 0.6 ) * 0.5 + 0.5 ) * 2.0;
      obj_box.position.z = 0.0 + ( Math.sin ( t * 0.6 ) * 0.5 + 0.5 ) * 2.0;

      renderer.render ( scene, camera );

      obj_ico.material.uniforms.uTime.value += 0.01;

      requestAnimationFrame ( update );

    }

    update();

    document.body.appendChild ( renderer.domElement );

  }

}
