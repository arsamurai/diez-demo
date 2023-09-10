import {
  AmbientLight,
  Box3,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

function isMobile() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ]

  return toMatch.some(toMatchItem => {
    return navigator.userAgent.match(toMatchItem)
  })
}

const threeModel = {
  init: async () => {
    let scene
    let camera
    let renderer
    const windowWidth = isMobile() ? screen.width : window.innerWidth
    const windowHeight = isMobile() ? screen.height : window.innerHeight

    const modelConfig = {
      width: windowWidth > 576 ? windowWidth * 0.5 : windowWidth - 40,
      height: windowHeight * 0.6,
      zoom: windowWidth > 576 ? 2.5 : 4,
      positionY: y => {
        return windowWidth > 576 ? -(y * 0.01) : y * 0.3
      },
    }

    const container = document.querySelector('[data-3d-scene]')

    //scene
    scene = new Scene()
    scene.background = null

    //camera
    camera = new PerspectiveCamera(25, modelConfig.width / modelConfig.height, 0.1, 1000)
    camera.position.z = modelConfig.zoom

    //renderer
    renderer = new WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(modelConfig.width, modelConfig.height)

    renderer.domElement.setAttribute('id', 'forWhom_model')
    container.appendChild(renderer.domElement)

    //light
    const aLight = new AmbientLight(0xd8d8d8, 1.2)
    scene.add(aLight)

    const pLight = new PointLight(0xffffff, 0.3)
    pLight.position.set(4, 5, 7)
    scene.add(pLight)

    //model
    const gltfLoader = new GLTFLoader()

    const gltf = await gltfLoader.loadAsync('./other/filatov3/scene.gltf')

    const bbox = new Box3().setFromObject(gltf.scene)
    const cent = bbox.getCenter(new Vector3())
    const size = bbox.getSize(new Vector3())

    const maxAxis = Math.max(size.x, size.y, size.z)
    gltf.scene.scale.multiplyScalar(1.0 / maxAxis)
    bbox.setFromObject(gltf.scene)
    bbox.getCenter(cent)
    bbox.getSize(size)

    gltf.scene.position.copy(cent).multiplyScalar(-1)
    gltf.scene.position.y += modelConfig.positionY(size.y)

    scene.add(gltf.scene)

    function onWindowResize() {
      modelConfig.width = modelConfig.width > 576 ? window.innerWidth * 0.5 : window.innerWidth - 40

      camera.aspect = modelConfig.width / modelConfig.height
      camera.updateProjectionMatrix()

      renderer.setSize(modelConfig.width, modelConfig.height)
    }

    addEventListener('resize', onWindowResize, false)

    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()

    // rotate animation
    let rotateIteration = 0
    let animateId

    const rotateRight = () => {
      animateId = requestAnimationFrame(rotateRight)

      gltf.scene.rotation.y += 0.03
      rotateIteration += 0.03

      const intRotateIteration = Number((rotateIteration * 100).toFixed())

      if (Math.abs(+(intRotateIteration % 33).toFixed()) === 0) {
        cancelAnimationFrame(animateId)
      }
    }

    const rotateLeft = () => {
      animateId = requestAnimationFrame(rotateLeft)

      gltf.scene.rotation.y -= 0.03
      rotateIteration -= 0.03

      const intRotateIteration = Number((rotateIteration * 100).toFixed())

      if (Math.abs(+(intRotateIteration % 33).toFixed()) === 0) {
        cancelAnimationFrame(animateId)
      }
    }

    return { rotateRight, rotateLeft }
  },
}

export default threeModel
