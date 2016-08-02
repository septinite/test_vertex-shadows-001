
import THREE from 'three';

const glslify = require ( 'glslify' );
const base = THREE.ShaderLib['phong'];

function shaderParse(glsl) {
    return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, (a, b) => {
      return THREE.ShaderChunk[b] + '\n';
    });
}

export default function GetCoolMaterialWow () {

  let mat = new THREE.ShaderMaterial ({

    uniforms: THREE.UniformsUtils.merge ( [ base.uniforms, { uTime: { type: 'f', value: 0.0 } } ] ),
    vertexShader: shaderParse ( glslify ('./vert.glsl') ),
    fragmentShader: shaderParse ( glslify ('./frag.glsl') ),
    lights: true,
    fog: true

  });

  return mat;

}
