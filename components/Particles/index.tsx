import React from 'react'
import { tsParticles } from 'tsparticles'

const AppParticles: React.FC = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return
    }

    tsParticles.load('tsParticles', {
      particles: {
        color: {
          value: 'random',
        },
        links: {
          color: {
            value: 'random',
          },
          enable: true,
          opacity: 0.8,
        },
        move: {
          enable: true,
        },
        size: {
          value: 3,
        },
      },
    })
  }

  return (
    <>
      <canvas ref={onCanvasLoaded} id={'tsParticles'}></canvas>
    </>
  )
}

export default AppParticles
