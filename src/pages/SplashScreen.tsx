import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPinIcon, CompassIcon, CoinsIcon } from 'lucide-react'
interface SplashScreenProps {
  onComplete: () => void
  skipEnabled?: boolean
}
const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  skipEnabled = true,
}) => {
  const [progress, setProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState(
    'Preparing your adventure...',
  )
  const messages = [
    'Preparing your adventure...',
    'Finding the best local spots...',
    'Calculating budget options...',
    'Planning the perfect itinerary...',
  ]
  useEffect(() => {
    // Cycle through loading messages
    const messageInterval = setInterval(() => {
      setLoadingMessage((prev) => {
        const currentIndex = messages.indexOf(prev)
        const nextIndex = (currentIndex + 1) % messages.length
        return messages[nextIndex]
      })
    }, 2000)
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          // Wait a moment at 100% before completing
          setTimeout(() => {
            onComplete()
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 40) // Completes in ~4 seconds
    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete, messages])
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0055CC] via-[#0066CC] to-[#004C99] text-white z-50"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="w-full max-w-md px-6 text-center">
        {/* Logo and Brand */}
        <motion.div
          initial={{
            y: -20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            type: 'spring',
          }}
          className="mb-8"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'easeInOut',
              }}
            >
              <img src="/src/assets/images/logo.svg" alt="LakbayBuddy Logo" className="w-24 h-24 drop-shadow-xl" />
            </motion.div>
          </div>
          <div className="flex justify-center mb-3">
            <img 
              src="/src/assets/images/lakbay-text.svg" 
              alt="LakbayBuddy" 
              className="h-20 w-auto drop-shadow-xl"
            />
          </div>
          <p className="text-blue-100 mt-2 font-light">
            Your budget-friendly travel companion
          </p>
        </motion.div>
        {/* Loading Animation */}
        <motion.div
          initial={{
            scale: 0.9,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
            duration: 0.5,
          }}
          className="mb-8"
        >
          <div className="relative h-2 bg-white bg-opacity-20 rounded-full overflow-hidden mb-3">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FFAA00] to-[#FFDD33]"
              style={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.3,
              }}
            />
          </div>
          <p className="text-blue-100 text-sm">{loadingMessage}</p>
        </motion.div>
        {/* Features Hint */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
            duration: 0.8,
          }}
          className="flex justify-center space-x-8 mb-12"
        >
          <motion.div
            className="flex flex-col items-center"
            whileHover={{
              scale: 1.05,
            }}
          >
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-10 flex items-center justify-center mb-2">
              <MapPinIcon
                className="h-6 w-6 text-[#FFDD33]"
                strokeWidth={1.5}
              />
            </div>
            <span className="text-xs text-blue-100">Explore</span>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{
              scale: 1.05,
            }}
          >
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-10 flex items-center justify-center mb-2">
              <CoinsIcon className="h-6 w-6 text-[#FF4D4D]" strokeWidth={1.5} />
            </div>
            <span className="text-xs text-blue-100">Budget</span>
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            whileHover={{
              scale: 1.05,
            }}
          >
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-10 flex items-center justify-center mb-2">
              <CompassIcon className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>
            <span className="text-xs text-blue-100">Navigate</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
export default SplashScreen
