    import './style.css'
    // import * as ScrollMagic from "scrollmagic";
    // import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";
    // import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
    import {gsap} from 'gsap';
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import * as THREE from 'three';
    import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
    import { Scene } from 'three';


    // Scene 1 - intro

    const introContainer = document.querySelector("#introContainer");
    const container = document.querySelector("#headsetContainer");
    const RLText = document.querySelector("#text");


    gsap.registerPlugin(ScrollTrigger);
    gsap.to(RLText, {
        scrollTrigger: {
            trigger: introContainer,
            start: "top top",
            end: "+=800px",
            markers: true,
            scrub: 1,
        },
        rotation: 360
      });


    // Scene 2 - oculus 

    let camera;
    let renderer;
    let scene;

    function init() {

        //Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        //Create scene
        scene = new THREE.Scene();

        const fov = 35;
        const aspect = container.clientWidth / container.clientHeight;
        const near = 0.1;
        const far = 1000;

        //Camera setup
        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 0, 1);


        const ambient = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambient);

        const light = new THREE.DirectionalLight(0xffffff, 2);
        light.position.set(50, 50, 100);
        scene.add(light);

        container.appendChild(renderer.domElement);

        let hscontainer = new THREE.Group();
        scene.add( hscontainer );

        //Load Model
        let loader = new GLTFLoader();
        loader.load("./headset/scene.gltf", function(gltf) {
            hscontainer.add(gltf.scene);
            animate();
        });

        hscontainer.position.set(0, 0, -2)

        gsap.to(hscontainer.rotation, {
            scrollTrigger: {
                trigger: container,
                start: "top top",
                pin: true,
                end: "+=500px",
                markers: true,
                scrub: 1,
            },
            x: 3,
            z: -3.15
          });

        gsap.to(camera.position, {
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=500px",
                markers: true,
                scrub: 1,
            },
            z: -1.7
          });

          const canvas = document.querySelector("canvas")
          gsap.to(canvas, {
            scrollTrigger: {
                trigger: container,
                start: "+=10px",
                end: "+=10px",
                markers: true,
                scrub: 1,
            },
            opacity: 0
          });
    
    }

    function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    }

    init();

    function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener("resize", onWindowResize);

    // scene 3 - purchase oculus 



