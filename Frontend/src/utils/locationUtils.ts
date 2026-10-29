// Utility functions for location management

export const saveCustomerLocation = async (lat: number, lng: number): Promise<boolean> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, skipping location save');
      return false;
    }

    console.log('📍 Saving location to database:', { lat, lng });

    const res = await fetch('http://localhost:5000/api/user/location', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lat, lng })
    });

    console.log('📍 Response status:', res.status);

    if (res.ok) {
      const data = await res.json();
      console.log('✅ Customer location saved to database:', data);
      return true;
    } else {
      const errorData = await res.json().catch(() => ({}));
      console.error('❌ Failed to save customer location:', res.status, errorData);
      return false;
    }
  } catch (err) {
    console.error('❌ Error saving customer location:', err);
    return false;
  }
};

export const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        let errorMessage = "Location access denied";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please allow location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable. Please check your GPS settings.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
        }
        
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
};

// Calculate distance between two points using Haversine formula
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371000; // Earth radius in meters
  const toRad = (val: number) => (val * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get customer's saved location from database
export const getCustomerSavedLocation = async (): Promise<{ lat: number; lng: number } | null> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, cannot get saved location');
      return null;
    }

    console.log('📍 Getting saved location from database...');

    const res = await fetch('http://localhost:5000/api/user/location', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📍 GET location response status:', res.status);

    if (res.ok) {
      const data = await res.json();
      console.log('✅ Retrieved saved location:', data);
      return data.location;
    } else {
      const errorData = await res.json().catch(() => ({}));
      console.log('No saved location found or error occurred:', res.status, errorData);
      return null;
    }
  } catch (err) {
    console.error('❌ Error getting saved location:', err);
    return null;
  }
}; 