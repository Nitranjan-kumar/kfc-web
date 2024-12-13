import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { getCurrentLocation, getAddressFromCoordinates } from '../../lib/geolocation';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (address: string) => void;
}

export function LocationModal({ isOpen, onClose, onLocationSelect }: LocationModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualAddress, setManualAddress] = useState('');

  if (!isOpen) return null;

  const handleAutoDetect = async () => {
    try {
      setLoading(true);
      setError(null);
      const position = await getCurrentLocation();
      const address = await getAddressFromCoordinates(
        position.coords.latitude,
        position.coords.longitude
      );
      onLocationSelect(address);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to detect location');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualAddress.trim()) {
      onLocationSelect(manualAddress);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Set Your Location</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}

        <button
          onClick={handleAutoDetect}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white p-3 rounded mb-4 hover:bg-red-700 disabled:opacity-50"
        >
          <MapPin size={20} />
          {loading ? 'Detecting...' : 'Auto-detect my location'}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or enter manually</span>
          </div>
        </div>

        <form onSubmit={handleManualSubmit}>
          <input
            type="text"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full p-3 border rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-gray-900 text-white p-3 rounded hover:bg-gray-800"
          >
            Confirm Location
          </button>
        </form>
      </div>
    </div>
  );
}