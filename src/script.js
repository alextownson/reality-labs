    import './style.css'
    import {gsap} from 'gsap';
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import * as THREE from 'three';
    import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

    const bg = document.querySelector("#background");
    const introContainer = document.querySelector("#introContainer");
    const container = document.querySelector("#headsetContainer");
    const metaContainer  = document.querySelector("#metaContainer");
    const RLText = document.querySelector("#text");

    // Scene 1 - intro

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(RLText, {
        scrollTrigger: {
            trigger: introContainer,
            start: "top top",
            end: "+=800px",
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
        loader.load("headset/scene.gltf", function(gltf) {
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
                scrub: 1,
            },
            x: 3,
            z: -3.2
          });

        gsap.to(camera.position, {
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=500px",
                scrub: 1,
            },
            z: -1.9
        });

        gsap.to(container, {
            scrollTrigger: {
                trigger: container,
                start: "+=1px",
                end: "+=99999",
                scrub: 1,
                toggleClass: "hidden",
            },
        });

        gsap.to(bg, {
            scrollTrigger: {
                trigger: bg,
                start: "+=1400px",
                end: "+=99999",
                scrub: 1,
                toggleClass: "blue",
            },
        }); 

        gsap.to(metaContainer, {
            scrollTrigger: {
                trigger: metaContainer,
                start: "+=1px",
                end: "+=99999",
                scrub: 1,
                toggleClass: "show",
            },
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

    // scene 3 - metaverse

    const button = document.querySelector('button'); 
    // const audio = new Audio('./meta.mp3');
    
    // function addEye() {
    //     eye = document.querySelector('.eye');
    //     UIgroup.appendChild(eye);
    //     eye.style.left = Math.random() * 100 + 'vw';
    //     eye.style.top = Math.random() * 100 + 'vh';
    // }

    // document.addEventListener('mousemove', (e) => {
    //     let ball = document.getElementsByClassName('ball'), mouseX, mouseY;
    //     for (var i = 0; i < ball.length; i++) {
    //         mouseX = (ball[i].getBoundingClientRect().left); 
    //         mouseY = (ball[i].getBoundingClientRect().top);
    //         let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
    //         let rotationDegrees = (radianDegrees * (180/ Math.PI) * -1);
    //         ball[i].style.transform = `translate(-50%, -50%) rotate(${rotationDegrees}deg)`
    //     } 
    // })

    // setInterval(addEye(), 100)

    button.addEventListener('click', () => {
        cancelAnimationFrame(animate);
        const UIgroup = document.querySelector('#UIgroup').remove();
        // audio.play();    
    });




