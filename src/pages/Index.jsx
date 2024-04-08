import { useState, useEffect } from "react";
import { Box, Button, Heading, Text, VStack, useColorMode } from "@chakra-ui/react";
import { FaPlay, FaPause, FaSync } from "react-icons/fa";

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [timeLeft, setTimeLeft] = useState(WORK_MINUTES * 60);
  const { colorMode } = useColorMode();

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            setIsWork((prevIsWork) => {
              const nextIsWork = !prevIsWork;
              return nextIsWork ? WORK_MINUTES * 60 : BREAK_MINUTES * 60;
            });
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Box bg={colorMode === "light" ? "gray.100" : "gray.900"} minH="100vh" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">
          Pomodoro Timer
        </Heading>
        <Box bg={colorMode === "light" ? "white" : "gray.700"} p={8} borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="4xl" mb={4}>
            {isWork ? "Work" : "Break"}
          </Heading>
          <Text fontSize="6xl" fontWeight="bold">
            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
          </Text>
          <Button mt={8} size="lg" colorScheme="blue" leftIcon={isRunning ? <FaPause /> : <FaPlay />} onClick={() => setIsRunning((prevState) => !prevState)}>
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button
            mt={4}
            size="lg"
            leftIcon={<FaSync />}
            onClick={() => {
              setIsRunning(false);
              setIsWork(true);
              setTimeLeft(WORK_MINUTES * 60);
            }}
          >
            Reset
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
