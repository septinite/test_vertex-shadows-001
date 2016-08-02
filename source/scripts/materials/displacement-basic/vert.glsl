#define CUSTOM_01

varying vec3 vViewPosition;

#ifndef FLAT_SHADED
  varying vec3 vNormal;
#endif

// chunk(common);
// chunk(shadowmap_pars_vertex);
// chunk(logdepthbuf_pars_vertex);

uniform float uTime;

void main() {

  // chunk(beginnormal_vertex);
  // chunk(morphnormal_vertex);
  // chunk(defaultnormal_vertex);

  #ifndef FLAT_SHADED
    vNormal = normalize ( transformedNormal );
  #endif

  vec3 transformed = vec3 ( position );               // chunk - begin vertex

  // custom stuff

  float mag = 2.0;

  vec3 displacement = vec3 (
    sin ( position.x * 10.0 + uTime + 0.0 ) * mag,
    sin ( position.y * 10.0 + uTime + 31.0 ) * mag,
    sin ( position.z * 10.0 + uTime + 112.0 ) * mag
  );

  transformed += displacement;

  // from chunk worldpos_vertex

  vec4 worldPosition = modelMatrix * vec4 ( transformed, 1.0 );

  // from chunk - project vertex

  vec4 mvPosition = viewMatrix * worldPosition;

  gl_Position = projectionMatrix * mvPosition;

  // chunk(logdepthbuf_vertex);

  vViewPosition = -mvPosition.xyz;

  // chunk(shadowmap_vertex);
  // this goes through the lights and assigns shadows according to the worldPosition defined above

  // chunk(clipping_planes_vertex);

}
