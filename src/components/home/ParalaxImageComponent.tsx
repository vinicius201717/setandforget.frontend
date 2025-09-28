/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

interface ParallaxFBXProps {
  fbxUrl: string // URL do arquivo FBX
}

const ParallaxFBX: React.FC<ParallaxFBXProps> = ({ fbxUrl }) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Configuração da cena
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })

    // Define o tamanho do renderer
    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight
    renderer.setSize(width, height)
    mountRef.current.appendChild(renderer.domElement)

    // Fundo da cena (ex: estrelas)
    scene.background = new THREE.TextureLoader().load(
      'https://threejs.org/examples/textures/8k_stars.jpg',
    )

    // Iluminação
    const light = new THREE.DirectionalLight(0xffffff, 0.8)
    light.position.set(0, 1, 1).normalize()
    scene.add(light)
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    // Carrega o modelo FBX
    const fbxLoader = new FBXLoader()
    let model: THREE.Group
    fbxLoader.load(
      fbxUrl,
      (object) => {
        model = object
        // Ajusta a escala do modelo (depende do tamanho do FBX)
        model.scale.set(0.01, 0.01, 0.01) // Ajuste conforme necessário
        model.position.set(0, 0, 0) // Centro da cena
        scene.add(model)
      },
      undefined,
      (error) => {
        console.error('Erro ao carregar o FBX:', error)
      },
    )

    // Posiciona a câmera
    camera.position.z = 5

    // Manipula o movimento do mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mountRef.current!.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX
      const mouseY = e.clientY

      // Calcula rotação com base na posição do mouse
      const rotateY = ((mouseX - centerX) / rect.width) * 0.3 // Suave
      const rotateX = -((mouseY - centerY) / rect.height) * 0.3

      // Aplica rotação ao modelo (se carregado)
      if (model) {
        model.rotation.y = rotateY
        model.rotation.x = rotateX
      }
    }

    // Animação
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Adiciona listener de mousemove
    window.addEventListener('mousemove', handleMouseMove)

    // Redimensionamento responsivo
    const handleResize = () => {
      const newWidth = mountRef.current!.clientWidth
      const newHeight = mountRef.current!.clientHeight
      renderer.setSize(newWidth, newHeight)
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [fbxUrl])

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '400px',
        backgroundColor: '#1d1e22',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
      }}
    />
  )
}

export default ParallaxFBX
