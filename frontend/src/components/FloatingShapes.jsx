import React from "react";
import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

// Animation keyframes for floating shapes
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  25% { transform: translateY(-15px) translateX(10px) rotate(90deg); }
  50% { transform: translateY(-10px) translateX(-5px) rotate(180deg); }
  75% { transform: translateY(-20px) translateX(15px) rotate(270deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const FloatingShapes = ({ variant = "hero", children }) => {
  const shapes = {
    hero: [
      {
        shape: "circle",
        size: "120px",
        top: "10%",
        right: "15%",
        bg: "linear-gradient(135deg, #287bbf, #ffb200)",
        animation: `${float} 6s ease-in-out infinite`,
        opacity: 0.7,
      },
      {
        shape: "rounded-square",
        size: "80px",
        top: "60%",
        right: "8%",
        bg: "linear-gradient(45deg, #ffb200, #287bbf)",
        animation: `${floatSlow} 8s ease-in-out infinite`,
        opacity: 0.6,
      },
      {
        shape: "circle",
        size: "60px",
        top: "25%",
        left: "12%",
        bg: "#ffb200",
        animation: `${pulse} 4s ease-in-out infinite`,
        opacity: 0.5,
      },
      {
        shape: "rounded-square",
        size: "40px",
        top: "75%",
        left: "25%",
        bg: "#287bbf",
        animation: `${float} 5s ease-in-out infinite`,
        opacity: 0.6,
      },
    ],
    section: [
      {
        shape: "circle",
        size: "60px",
        top: "20%",
        right: "10%",
        bg: "linear-gradient(135deg, #287bbf, #ffb200)",
        animation: `${float} 7s ease-in-out infinite`,
        opacity: 0.4,
      },
      {
        shape: "rounded-square",
        size: "45px",
        bottom: "15%",
        left: "8%",
        bg: "#ffb200",
        animation: `${floatSlow} 9s ease-in-out infinite`,
        opacity: 0.5,
      },
    ],
    minimal: [
      {
        shape: "circle",
        size: "30px",
        top: "10%",
        right: "5%",
        bg: "#ffb200",
        animation: `${pulse} 3s ease-in-out infinite`,
        opacity: 0.3,
      },
    ],
  };

  const currentShapes = shapes[variant] || shapes.minimal;

  return (
    <Box position="relative" w="100%" h="100%" overflow="hidden">
      {/* Background shapes */}
      {currentShapes.map((shape, index) => (
        <Box
          key={index}
          position="absolute"
          width={shape.size}
          height={shape.size}
          top={shape.top}
          bottom={shape.bottom}
          left={shape.left}
          right={shape.right}
          bg={shape.bg}
          borderRadius={shape.shape === "circle" ? "50%" : "15px"}
          opacity={shape.opacity}
          animation={shape.animation}
          pointerEvents="none"
          zIndex={-1}
          filter="blur(1px)"
          _hover={{
            filter: "blur(0px)",
            opacity: shape.opacity + 0.2,
            transition: "all 0.3s ease",
          }}
        />
      ))}

      {/* Content */}
      {children}
    </Box>
  );
};

export default FloatingShapes;
