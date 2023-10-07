import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Gltf, ScrollControls, useScroll, Html, Scroll, Text } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import theatreState from "./macbook_flythrough.json";

import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,

} from "@theatre/r3f";
import { useState, useEffect } from "react";
import ToolTip from "./components/Tooltip";
import { MacBookGroup } from "./components/MacbookGroup";
import { editable as e } from "@theatre/r3f"

export default function App() {
  const sheet = getProject("Fly Through", { state: theatreState }).sheet(
    "Scene"
  );

  return (
    <div className="container mx-auto h-screen overflow-hidden p-0 m-0">
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <ScrollControls pages={5}>
          <SheetProvider sheet={sheet}>
            <Scene />
          </SheetProvider>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useEffect(() => {
    console.clear()
    console.log('%cMade with Theatre.js and React Three Fiber by Sadman Yasar Sayem', 'color: yellow;');

    console.log('%cHire Me on Upwork https://www.upwork.com/freelancers/~01cfd344d945d1f282', 'color: yellow;');
  }, [])

  // our callback will run on every animation frame
  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  const bgColor = "#000000";

  return (
    <>
      {/* <color attach="background" args={[bgColor]} /> */}
      <fog attach="fog" color={bgColor} near={-4} far={40} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <MacBookGroup />
      <e.mesh theatreKey="text">
        <Text
          scale={[0.7, 1, 1]}
          color="white" // default
          anchorX="center" // default
          anchorY="middle" // default
        >
          BOLD
        </Text>
      </e.mesh>
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  );
}
