import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { SetStateAction, useRef, useState } from "react";

const API_KEY = process.env.API_KEY;

const Checkout = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState({ lat: 50.4501, lng: 30.5234 });
  const [userMovedMap, setUserMovedMap] = useState(false);
  const markerRef = useRef(null);


  const handleLoad = (map: SetStateAction<google.maps.Map | null>) => {
    setMap(map);
  };

  const handleCenterChanged = async () => {
    if (!map || !userMovedMap) return;

    const center = map.getCenter();
    if (center) {
      const latlng = {
        lat: center.lat(),
        lng: center.lng(),
      };

      setMarker(latlng);

      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=${API_KEY}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          setAddress(result.formatted_address);
          const components = result.address_components;
          for (const component of components) {
            if (component.types.includes('locality')) {
              setCity(component.long_name);
            }
            if (component.types.includes('postal_code')) {
              setZipCode(component.long_name);
            }
            if (component.types.includes('country')) {
              setCountry(component.long_name);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    }
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', {
      fullName,
      email,
      address,
      city,
      zipCode,
      country,
      cardNumber,
      expiry,
      cvc
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex mt-24">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="zipCode" className="block text-gray-700 text-sm font-bold mb-2">Zip Code</label>
        <input
          type="text"
          id="zipCode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">Card Details</label>
      <div className="flex mb-4">
      <div className="relative w-7/12 flex-shrink-0">

        <input 
          type="text" 
          id="card-no" 
          name="card-no"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full rounded-md border border-gray-200 px-2 
            py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 
            focus:ring-blue-500" 
            placeholder="xxxx-xxxx-xxxx-xxxx" 
          />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
          </svg>
        </div>
      </div>

      <input 
        type="text" 
        name="credit-expiry" 
        className="w-full rounded-md border border-gray-200 px-2 
          py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 
          focus:ring-blue-500" 
        placeholder="MM/YY"
        value={expiry} 
        onChange={(e) => setExpiry(e.target.value)} 
      />
      <input 
        type="text" 
        name="credit-cvc" 
        className="w-1/6 flex-shrink-0 rounded-md border 
          border-gray-200 px-2 py-3 text-sm shadow-sm outline-none 
          focus:z-10 focus:border-blue-500 focus:ring-blue-500" 
        placeholder="CVC"
        value={cvc} 
        onChange={(e) => setCvc(e.target.value)} 
      />
      </div>

      <div className="mb-4">
        <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
        <input
          type="text"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Place Order
      </button>
      </form>

      
      <LoadScript googleMapsApiKey={`${API_KEY}`}>
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "700px" }}
          center={markerRef.current || { lat: 50.4501, lng: 30.5234 }}
          zoom={10}
          onLoad={handleLoad}
          onCenterChanged={handleCenterChanged}
        >
          {markerRef.current && <Marker position={markerRef.current} />}
        </GoogleMap>
      </LoadScript>
      
     </div>
    </div>
  );
};

export default Checkout;