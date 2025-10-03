import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  VStack,
  HStack,
  Heading,
  Text,
  Icon,
  Badge,
  Button,
} from "@chakra-ui/react";
import { FaClock, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { getEventTypeColor, formatEventDate } from "../../utils/cardHelpers";

/**
 * EventCard Component
 * Displays an event with date, time, and location
 */
const EventCard = React.memo(({ event }) => {
  const { day, month } = formatEventDate(event.date);

  return (
    <Card
      borderRadius="2xl"
      overflow="hidden"
      bg="white"
      shadow="lg"
      _hover={{
        transform: "translateY(-8px)",
        shadow: "2xl",
      }}
      transition="all 0.3s ease"
      h="full"
      role="article"
      aria-label={`กิจกรรม: ${event.title}`}
    >
      <CardBody p={6}>
        <HStack spacing={4} align="start" h="full">
          {/* Date Box */}
          <VStack
            spacing={0}
            bg={`${getEventTypeColor(event.type)}.500`}
            color="white"
            p={3}
            borderRadius="xl"
            minW="70px"
            textAlign="center"
          >
            <Text fontSize="2xl" fontWeight="bold" lineHeight="1">
              {day}
            </Text>
            <Text fontSize="xs" textTransform="uppercase" fontWeight="600">
              {month}
            </Text>
          </VStack>

          {/* Event Details */}
          <VStack align="start" spacing={3} flex={1} h="full">
            <VStack align="start" spacing={2} flex={1}>
              <Badge
                colorScheme={getEventTypeColor(event.type)}
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="600"
              >
                {event.type}
              </Badge>

              <Heading
                size="md"
                color="gray.800"
                fontWeight="600"
                lineHeight="1.3"
                noOfLines={2}
              >
                {event.title}
              </Heading>

              <Text
                color="gray.600"
                fontSize="sm"
                lineHeight="1.6"
                noOfLines={2}
              >
                {event.description}
              </Text>
            </VStack>

            <VStack spacing={2} align="start" w="full">
              <HStack spacing={2} align="center">
                <Icon as={FaClock} color="gray.400" boxSize={3} />
                <Text fontSize="xs" color="gray.500">
                  {event.time}
                </Text>
              </HStack>

              {event.location && (
                <HStack spacing={2} align="center">
                  <Icon as={FaMapMarkerAlt} color="gray.400" boxSize={3} />
                  <Text fontSize="xs" color="gray.500" noOfLines={1}>
                    {event.location}
                  </Text>
                </HStack>
              )}
            </VStack>

            <Button
              size="sm"
              colorScheme={getEventTypeColor(event.type)}
              variant="ghost"
              rightIcon={<FaArrowRight />}
              fontWeight="600"
              alignSelf="flex-start"
              _hover={{
                bg: `${getEventTypeColor(event.type)}.50`,
              }}
            >
              สมัครเข้าร่วม
            </Button>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
});

EventCard.displayName = "EventCard";

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    type: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};

export default EventCard;
