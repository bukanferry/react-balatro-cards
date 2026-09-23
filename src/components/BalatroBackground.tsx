import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const fragmentShader = `
uniform vec2 iResolution;
uniform float iTime;

// Original by localthunk (https://www.playbalatro.com)

// Configuration (modify these values to change the effect)
#define SPIN_ROTATION -2.0
#define SPIN_SPEED 7.0
#define OFFSET vec2(0.0)
#define CONTRAST 3.5
#define LIGTHING 0.4
#define SPIN_AMOUNT 0.25
#define PIXEL_FILTER 745.0
#define SPIN_EASE 1.0
#define PI 3.14159265359
#define IS_ROTATE true

vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / PIXEL_FILTER;
    vec2 uv = (floor(screen_coords.xy*(1./pixel_size))*pixel_size - 0.5*screenSize.xy)/length(screenSize.xy) - OFFSET;
    float uv_len = length(uv);
    
    float speed = (SPIN_ROTATION*SPIN_EASE*0.2);
    if(IS_ROTATE){
       speed = iTime * speed;
    }
    speed += 302.2;
    float new_pixel_angle = atan(uv.y, uv.x) + speed - SPIN_EASE*20.*(1.*SPIN_AMOUNT*uv_len + (1. - 1.*SPIN_AMOUNT));
    vec2 mid = (screenSize.xy/length(screenSize.xy))/2.;
    uv = (vec2((uv_len * cos(new_pixel_angle) + mid.x), (uv_len * sin(new_pixel_angle) + mid.y)) - mid);
    
    uv *= 30.;
    speed = iTime*(SPIN_SPEED);
    vec2 uv2 = vec2(uv.x+uv.y);
    
    for(int i=0; i < 5; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv  += 0.5*vec2(cos(5.1123314 + 0.353*uv2.y + speed*0.131121),sin(uv2.x - 0.113*speed));
        uv  -= 1.0*cos(uv.x + uv.y) - 1.0*sin(uv.x*0.711 - uv.y);
    }
    
    // Dynamic color cycling: vibrant neon pinks, deep blues, purples, and matrix greens.
    vec3 neonPink = vec3(1.0, 0.07, 0.57);
    vec3 deepBlue = vec3(0.0, 0.1, 0.6);
    vec3 purple = vec3(0.5, 0.0, 0.8);
    vec3 matrixGreen = vec3(0.0, 0.9, 0.1);
    
    float cycle = mod(iTime * 0.4, 4.0);
    vec3 mixColor;
    if (cycle < 1.0) mixColor = mix(neonPink, deepBlue, smoothstep(0.0, 1.0, cycle));
    else if (cycle < 2.0) mixColor = mix(deepBlue, purple, smoothstep(0.0, 1.0, cycle - 1.0));
    else if (cycle < 3.0) mixColor = mix(purple, matrixGreen, smoothstep(0.0, 1.0, cycle - 2.0));
    else mixColor = mix(matrixGreen, neonPink, smoothstep(0.0, 1.0, cycle - 3.0));
    
    vec4 COLOUR_1 = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 COLOUR_2 = vec4(mixColor, 1.0);
    vec4 COLOUR_3 = vec4(mixColor * 0.3, 1.0);

    float contrast_mod = (0.25*CONTRAST + 0.5*SPIN_AMOUNT + 1.2);
    float paint_res = min(2., max(0.,length(uv)*(0.035)*contrast_mod));
    float c1p = max(0.,1. - contrast_mod*abs(1.-paint_res));
    float c2p = max(0.,1. - contrast_mod*abs(paint_res));
    float c3p = 1. - min(1., c1p + c2p);
    float light = (LIGTHING - 0.2)*max(c1p*5. - 4., 0.) + LIGTHING*max(c2p*5. - 4., 0.);
    return (0.3/CONTRAST)*COLOUR_1 + (1. - 0.3/CONTRAST)*(COLOUR_1*c1p + COLOUR_2*c2p + vec4(c3p*COLOUR_3.rgb, c3p*COLOUR_1.a)) + light;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord/iResolution.xy;
    fragColor = effect(iResolution.xy, uv * iResolution.xy);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const internalTime = useRef(0);

  useFrame((_state, delta) => {
    if (materialRef.current) {
      internalTime.current += delta * 0.1;
      materialRef.current.uniforms.iTime.value = internalTime.current;
      
      const dpr = window.devicePixelRatio || 1;
      materialRef.current.uniforms.iResolution.value.set(size.width * dpr, size.height * dpr);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2() }
        }}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function BalatroBackground() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }}>
      <Canvas orthographic camera={{ position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 10 }}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
