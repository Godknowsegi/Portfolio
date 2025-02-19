import * as THREE from "three";
import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useLoader } from "react-three-fiber";
import { useTransition, a } from "react-spring";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, draco, Stars } from "drei";
import Typewriter from "typewriter-effect";
import Wave from "./Wave";
import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
import Ab1 from "./Ab1";
import axios from "axios";
import BASE_URL from "../api";
import { toast } from "react-toastify";
import "animate.css";
import { notify, NotifyWrapper } from "./Notify";

function Model({ url }) {
  const { nodes, materials } = useLoader(GLTFLoader, url, draco());
  return (
    <group
      rotation={[-Math.PI / 2, 0, 0]}
      position={[-9, 6, 0]}
      scale={[7, 7, 7]}
    >
      <group rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.planet001.geometry}
          material={materials.scene}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.planet002.geometry}
          material={materials.scene}
        />
      </group>
    </group>
  );
}

function Loading() {
  const [finished, set] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    THREE.DefaultLoadingManager.onLoad = () => set(true);
    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
      setWidth((itemsLoaded / itemsTotal) * 200);
  }, []);

  const props = useTransition(finished, null, {
    from: { opacity: 1, width: 0 },
    leave: { opacity: 0 },
    update: { width },
  });

  return props.map(
    ({ item: finished, key, props: { opacity, width } }) =>
      !finished && (
        <a.div className="loading" key={key} style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width }} />
          </div>
        </a.div>
      )
  );
}

export default function Home({
  onClick,
  views,
  likes,
  setTotallikes,
  setTotalviews,
}) {
  const [switcher, setSwitcher] = useState(false);
  const [switcher2, setSwitcher2] = useState(false);
  const [content, setContent] = useState({});

  const year = new Date().getFullYear();
  const user = localStorage.getItem("usermy87");
  const handleLike = async () => {
    setSwitcher2(!switcher2);
    if (switcher2) {
      await axios.put(`${BASE_URL}removeLike/${user}`).then((res) => {
        if (res?.data?.status) {
          setContent({
            type: "error",
            message: `Like removed successfully`,
            positions: "top-left",
          });

          axios.get(`${BASE_URL}totalLikes`).then((res) => {
            console.log(res.data?.data);
            setTotallikes(res.data?.data);
          });
          axios.get(`${BASE_URL}totalView`).then((res) => {
            console.log(res.data?.data);
            setTotalviews(res.data?.data);
          });
        }
      });
      console.log("notliked");
    } else {
      await axios.put(`${BASE_URL}addLike/${user}`).then((res) => {
        if (res?.data?.status) {
          setContent({
            type: "success",
            message: `Like added successfully`,
            positions: "top-left",
          });

          axios.get(`${BASE_URL}totalLikes`).then((res) => {
            console.log(res.data?.data);
            setTotallikes(res.data?.data);
          });
          axios.get(`${BASE_URL}totalView`).then((res) => {
            console.log(res.data?.data);
            setTotalviews(res.data?.data);
          });
        }
        console.log(res?.data);
      });
      console.log("liked");
    }
  };

  const handleView = async () => {
    setSwitcher(!switcher);
  };

  console.log(content);
  return (
    <>
      <NotifyWrapper props={content} />

      <div className="bg-[#797979]  rounded-full  bg-clip-padding backdrop-filter backdrop-blur-xl flex-col flex justify-center items-center bg-opacity-60 right-1  fixed  p-1 z-20 top-20 mr-1">
        <div
          onClick={handleView}
          title={`${views} viewd this site`}
          className="cursor-pointer text-2xl mb-2"
        >
          {switcher ? (
            <pre className="text-[8px] tracking-wider animate__fadeInRight animate__animated px-1  bg-[peru]  text-center absolute right-6 rounded-full">
              {views} people viewed this site
            </pre>
          ) : null}
          👀
        </div>
        <div
          onClick={handleLike}
          title={`${likes} like this site`}
          className="cursor-pointer text-2xl mb-[10px]"
        >
          {switcher ? (
            <pre className="text-[8px] px-1 tracking-wider animate__fadeInRight animate__animated bg-[peru]  text-center absolute right-6 rounded-full">
              {likes} people liked this site
            </pre>
          ) : null}
          ❤️
        </div>
        <div
          onClick={() => {
            window.location.href = "https://wa.me/+2347082524010";
          }}
          // title="watsapp me"
          className="cursor-pointer text-3xl mb-2"
        >
          <img src="/whatsapp.png" alt="" className="w-7 h-7" />
        </div>
        <div
          onClick={() => {
            window.location.href = "https://github.com/Dom000";
          }}
          // title="watsapp me"
          className="cursor-pointer text-3xl mb-2"
        >
          <AiOutlineGithub />
        </div>
        <div
          onClick={() => {
            window.location.href =
              "https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BaNacoGWFS7q26264iXoimg%3D%3D";
          }}
          // title="watsapp me"
          className="cursor-pointer text-3xl mb-2"
        >
          <AiFillLinkedin className="text-[#3564da]" />
        </div>
      </div>

      <div className="bg" />
      <path d="M0 40h1680V30S1340 0 840 0 0 30 0 30z" fill="#fff"></path>
      <div id="h3">
        <Typewriter
          options={{
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter

              .typeString("I am Godknows Egi 👌👌")

              .pauseFor(1000)
              .deleteAll()
              .typeString("Welcome  to my world of Fullstack Web Dev....")
              .start();
          }}
        />
      </div>
      <Canvas
        style={{ height: 500 }}
        shadowMap
        camera={{ position: [0, 0, 15] }}
      >
        <ambientLight intensity={0.75} />
        <pointLight intensity={1} position={[-10, -25, -10]} />
        <spotLight
          castShadow
          intensity={2.25}
          angle={0.2}
          penumbra={1}
          position={[25, 25, 25]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <fog attach="fog" args={["#cc7b32", 16, 20]} />
        <Suspense fallback={null}>
          <Model url="/scene-draco.gltf" />
        </Suspense>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.5}
          rotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Stars radius={500} depth={50} count={1000} factor={10} />
      </Canvas>
      <div className="layer" />
      <Loading />

      <div id="wh-div" className="w-[100%] h-[250px]  lg:h-[50px]  bg-white">
        <img
          className=" w-[250px] sm:w-[300px] bottom-[-10%] left-[20%]  sm:left-[60%] md:w-[400px]  lg:w-[400px] absolute md:bottom-[10%] md:left-[50%] lg:bottom-[-10%] lg:left-[60%]"
          src="/astro-mona.webp"
          alt="logo"
        />
      </div>
      <Wave />
      <div className="bg-mybg">
        <Ab1 onClick={onClick} />
        <p className="text-white mt-10 text-center">
          Godknows Egi{"  "}Ⓒ {year} All rights reserved
        </p>
      </div>
    </>
  );
}
