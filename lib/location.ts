import * as Location from 'expo-location';

/**
 * Interface for location coordinates
 */
export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

/**
 * Gets the current GPS coordinates
 * 
 * @returns Promise resolving to the current coordinates
 * @throws Error if location permission is denied or location services are disabled
 */
export const getCurrentLocation = async (): Promise<LocationCoordinates> => {
  try {
    // Request permission to access location
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      throw new Error('Location permission denied');
    }
    
    // Get the current position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    throw new Error('Failed to get current location');
  }
};

/**
 * Formats coordinates into a human-readable string
 * 
 * @param coordinates The coordinates to format
 * @returns A formatted string representation of the coordinates
 */
export const formatCoordinates = (coordinates: LocationCoordinates): string => {
  const { latitude, longitude } = coordinates;
  return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
};