import './style.css'
// importing all the dependencies 
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

// importing elements 
const bg = document.querySelector("#background")
const introContainer = document.querySelector("#introContainer")
const container = document.querySelector("#headsetContainer")
const metaContainer  = document.querySelector("#metaContainer")
const RLText = document.querySelector("#text")
const UIGroupL = document.querySelector('#UIGroupL')
const UIGroupR = document.querySelector('#UIGroupR')
const links = document.querySelector('#links')
const iframe = document.querySelector('iframe')

/**
 * SCENE 1 INTRO
 */

// using gsap scroll trigger to make the text of the logo spin on scroll 
// GSAP Animation
gsap.registerPlugin(ScrollTrigger)
gsap.to(RLText, {
    scrollTrigger: {
        trigger: introContainer,
        start: "top top",
        end: "+=800px",
        scrub: 1,
    },
    rotation: 360
})

// **********************************************************

/**
 * SCENE 2 OCULUS
 */

//Create scene
const scene = new THREE.Scene()

//Camera setup
const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000)
camera.position.set(0, 0, 0)

// Controls these are for the history section so they are set to false for now
const controls = new OrbitControls(camera, container)
controls.mouseButtons = {
	LEFT: THREE.MOUSE.PAN,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.ROTATE
}
controls.enabled = false

// Lights
const ambient = new THREE.AmbientLight(0x404040, 2)
scene.add(ambient)
const light = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(50, 50, 100)
scene.add(light)

// Create a container for model
const hscontainer = new THREE.Group()
scene.add( hscontainer )

//Load Model
let loader = new GLTFLoader()
loader.load("headset/scene.gltf", function(gltf) {
    hscontainer.add(gltf.scene)
    animate()
});

// Set model initial position
hscontainer.position.set(0, 0, -2)

/**
 * History
 */
// This is where I am drawing all the dates and images onto the canvas for the history section
// I think there is a much easier way to do this, possibly with a three js text library but this was the only solution I could come up with in a reasonable amount of time 

// images as textures 
const textureLoader = new THREE.TextureLoader()
const texture1 = textureLoader.load('assets/2014.png')
const texture2 = textureLoader.load('assets/2015.png')
const texture3 = textureLoader.load('assets/2016.png')
const texture4 = textureLoader.load('assets/2017.png')
const texture5 = textureLoader.load('assets/2018.png')
const texture6 = textureLoader.load('assets/2019.png')
const texture7 = textureLoader.load('assets/2020.png')
const texture8 = textureLoader.load('assets/2021.png')
const texture9 = textureLoader.load('assets/2022.png')

// planes 
const geometry = new THREE.PlaneGeometry( 16, 10 );
const planeMaterial1 = new THREE.MeshBasicMaterial( {map: texture1, side: THREE.DoubleSide} );
const plane1 = new THREE.Mesh( geometry, planeMaterial1 );
const planeMaterial2 = new THREE.MeshBasicMaterial( {map: texture2, side: THREE.DoubleSide} );
const plane2 = new THREE.Mesh( geometry, planeMaterial2 );
plane2.position.x = 20
const planeMaterial3 = new THREE.MeshBasicMaterial( {map: texture3, side: THREE.DoubleSide} );
const plane3 = new THREE.Mesh( geometry, planeMaterial3 );
plane3.position.x = 40
const planeMaterial4 = new THREE.MeshBasicMaterial( {map: texture4, side: THREE.DoubleSide} );
const plane4 = new THREE.Mesh( geometry, planeMaterial4 );
plane4.position.x = 60
const planeMaterial5 = new THREE.MeshBasicMaterial( {map: texture5, side: THREE.DoubleSide} );
const plane5 = new THREE.Mesh( geometry, planeMaterial5 );
plane5.position.x = 80
const planeMaterial6 = new THREE.MeshBasicMaterial( {map: texture6, side: THREE.DoubleSide} );
const plane6 = new THREE.Mesh( geometry, planeMaterial6 );
plane6.position.x = 100
const planeMaterial7 = new THREE.MeshBasicMaterial( {map: texture7, side: THREE.DoubleSide} );
const plane7 = new THREE.Mesh( geometry, planeMaterial7 );
plane7.position.x = 120
const planeMaterial8 = new THREE.MeshBasicMaterial( {map: texture8, side: THREE.DoubleSide} );
const plane8 = new THREE.Mesh( geometry, planeMaterial8 );
plane8.position.x = 140
const planeMaterial9 = new THREE.MeshBasicMaterial( {map: texture9, side: THREE.DoubleSide} );
const plane9 = new THREE.Mesh( geometry, planeMaterial9 );
plane9.position.x = 160

// create a group for all of the images
const data = new THREE.Group()
data.add(plane1, plane2, plane3, plane4, plane5, plane6, plane7, plane8, plane9)

// create all the text
const textMaterial = new THREE.MeshNormalMaterial()
let date1, date2, date3, date4, date5, date6, date7, date8, date9;

const fontLoader = new FontLoader()
fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry1 = new TextGeometry(
            '2014',
            {
                font,
                size: 2, 
                height: 0.2, 
                curveSegment: 5, 
                bevelEnabled: true, 
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0, 
                bevelSegments: 3
            }
           )
            textGeometry1.center()
    
           date1 = new THREE.Mesh(textGeometry1, textMaterial)
           date1.position.set(0, 8)
    
           const textGeometry2 = new TextGeometry(
            '2015',
            {
                font,
                size: 2, 
                height: 0.2, 
                curveSegment: 5, 
                bevelEnabled: true, 
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0, 
                bevelSegments: 3
            }
           )
            textGeometry2.center()
    
           date2 = new THREE.Mesh(textGeometry2, textMaterial)
           date2.position.set(20, 8)

           const textGeometry3 = new TextGeometry(
            '2016',
            {
                font,
                size: 2, 
                height: 0.2, 
                curveSegment: 5, 
                bevelEnabled: true, 
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0, 
                bevelSegments: 3
            }
           )
            textGeometry3.center()
    
           date3 = new THREE.Mesh(textGeometry3, textMaterial)
           date3.position.set(40, 8)

           const textGeometry4 = new TextGeometry(
            '2017',
            {
                font,
                size: 2, 
                height: 0.2, 
                curveSegment: 5, 
                bevelEnabled: true, 
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0, 
                bevelSegments: 3
            }
           )
            textGeometry4.center()
    
           date4 = new THREE.Mesh(textGeometry4, textMaterial)
           date4.position.set(60, 8)

           const textGeometry5 = new TextGeometry(
            '2018',
            {
                font,
                size: 2, 
                height: 0.2, 
                curveSegment: 5, 
                bevelEnabled: true, 
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0, 
                bevelSegments: 3
            }
           )
            textGeometry5.center()
    
           date5 = new THREE.Mesh(textGeometry5, textMaterial)
           date5.position.set(80, 8)

           const textGeometry6 = new TextGeometry(
            '2019',
            {
                font,
                size: 2, 
                height: 0.2, 
                curveSegment: 5, 
                bevelEnabled: true, 
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0, 
                bevelSegments: 3
            }
           )
            textGeometry6.center()
    
           date6 = new THREE.Mesh(textGeometry6, textMaterial)
           date6.position.set(100, 8)

           const textGeometry7 = new TextGeometry(
            '2020',
            {
                font,
                size: 2, 
                height: 0.2, 
                curveSegment: 5, 
                bevelEnabled: true, 
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0, 
                bevelSegments: 3
            }
           )
            textGeometry7.center()
    
           date7 = new THREE.Mesh(textGeometry7, textMaterial)
           date7.position.set(120, 8)

           const textGeometry8 = new TextGeometry(
            '2021',
            {
                font,
                size: 2, 
                height: 0.2, 
                curveSegment: 5, 
                bevelEnabled: true, 
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0, 
                bevelSegments: 3
            }
           )
            textGeometry8.center()
    
           date8 = new THREE.Mesh(textGeometry8, textMaterial)
           date8.position.set(140, 8)

           const textGeometry9 = new TextGeometry(
            '2022',
            {
                font,
                size: 2, 
                height: 0.2, 
                curveSegment: 5, 
                bevelEnabled: true, 
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0, 
                bevelSegments: 3
            }
           )
            textGeometry9.center()
    
           date9 = new THREE.Mesh(textGeometry9, textMaterial)
           date9.position.set(160, 8)
    }
)

//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(container.clientWidth, container.clientHeight)
renderer.setPixelRatio(window.devicePixelRatio)

// Add renderer to the page
container.appendChild(renderer.domElement)

// GSAP Animations
// rotate the headset
gsap.to(hscontainer.rotation, {
    scrollTrigger: {
        trigger: container,
        start: "top",
        end: "bottom",
        scrub: 1,
        pin: true,
        pinSpacing: false
    },
    x: Math.PI,
    z: Math.PI * -1
    })
// move the camera closer
gsap.to(camera.position, {
    scrollTrigger: {
        trigger: container,
        start: "top",
        end: "bottom",
        scrub: 1,
        onLeave: () => 
        {
            container.style.opacity = 0
            bg.classList.add('blue')
        },
        onEnterBack: () =>
        {
            container.style.opacity = 1
            bg.classList.remove('blue')
        } 
    },
    z: -1.8
})

// blur and move UI element
ScrollTrigger.create({
        trigger: metaContainer,
        start: "top",
        end: "top",
        scrub: 1,
        onEnter: () => 
        {
            UIGroupL.style.transition = '0.8s'
            UIGroupL.style.opacity = '1'
            UIGroupL.style.filter = 'blur(0px)'
            UIGroupL.style.transform = 'translate(0px)'
            UIGroupR.style.transition = '0.8s'
            UIGroupR.style.opacity = '1'
            UIGroupR.style.filter = 'blur(0px)'
            UIGroupR.style.transform = 'translate(0px)'
        },
        onLeaveBack: () => 
        {
            UIGroupL.style.transition = '0s'
            UIGroupL.style.opacity = '0'
            UIGroupL.style.filter = 'blur(20px)'
            UIGroupL.style.transform = 'translate(-300px)'
            UIGroupR.style.transition = '0s'
            UIGroupR.style.opacity = '0'
            UIGroupR.style.filter = 'blur(20px)'
            UIGroupR.style.transform = 'translate(300px)'
        },
})

// If window is resized 
function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
}

window.addEventListener("resize", onWindowResize)

// **********************************************************


/**
 * SCENE 3 - METAVERSE
 */

// on click the continue button
const button = document.querySelector('#button'); 
button.addEventListener('click', () => {
    introContainer.remove()
    metaContainer.remove()
    scene.remove(hscontainer)
    history()
})

// add all the text, images and links to the scene
function history() {
    ScrollTrigger.disable()
    container.style.opacity = 1
    container.style.cursor = 'grab'
    controls.enabled = true
    controls.enableDamping = true
    camera.position.set(0, 0, 35)
    scene.add(data)
    scene.add(date1)
    scene.add(date2)
    scene.add(date3)
    scene.add(date4)
    scene.add(date5)
    scene.add(date6)
    scene.add(date7)
    scene.add(date8)
    scene.add(date9)
    links.style.display = 'flex'
}

// animate the canvas
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    if(controls.enabled){
        controls.update()
    }
    if (camera.position.z >= 1000){
        container.remove()
        links.remove()
        iframe.style.display = 'block'
    }
}




