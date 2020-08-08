import React from 'react'
import { tsParticles } from 'tsparticles'
import { theme } from '@chakra-ui/core'

const AppParticles: React.FC = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return
    }
    setTimeout(() => {
      tsParticles.load('tsParticles', {
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'bubble',
            },
          },
          modes: {
            bubble: {
              size: 8,
              color: {
                value: theme.colors.teal[300],
              },
            },
          },
        },
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
    }, 200)
  }

  return (
    <>
      <canvas ref={onCanvasLoaded} id={'tsParticles'}></canvas>
    </>
  )
}

export default AppParticles
