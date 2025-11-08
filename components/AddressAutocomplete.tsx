'use client'

import { useEffect, useRef, useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'

const libraries: ("places" | "geometry")[] = ['places', 'geometry']

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    fullAddress: string
    city: string
    street: string
    houseNumber: string
    isValid: boolean
    distance?: number
  }) => void
  value?: string
}

export default function AddressAutocomplete({ onAddressSelect, value }: AddressAutocompleteProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
    language: 'he',
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [error, setError] = useState<string>('')
  const [isValidating, setIsValidating] = useState(false)

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return

    // Initialize autocomplete with Israel restrictions
    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'il' },
      fields: ['address_components', 'formatted_address', 'geometry'],
      types: ['address'],
    })

    // Listen for place selection
    autocompleteRef.current.addListener('place_changed', async () => {
      const place = autocompleteRef.current?.getPlace()

      if (!place || !place.geometry) {
        setError('לא נמצאה כתובת. אנא בחרו מהרשימה')
        return
      }

      setIsValidating(true)
      setError('')

      try {
        // Calculate distance from Akko
        const akkoLocation = new google.maps.LatLng(32.9276, 35.0838) // Akko coordinates
        const destinationLocation = place.geometry.location

        if (!destinationLocation) {
          throw new Error('Invalid location')
        }

        // Use Distance Matrix to get real driving distance
        const service = new google.maps.DistanceMatrixService()

        const response = await new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
          service.getDistanceMatrix(
            {
              origins: [akkoLocation],
              destinations: [destinationLocation],
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.METRIC,
            },
            (response, status) => {
              if (status === 'OK' && response) {
                resolve(response)
              } else {
                reject(new Error('Failed to calculate distance'))
              }
            }
          )
        })

        const distanceInMeters = response.rows[0].elements[0].distance?.value

        if (!distanceInMeters) {
          throw new Error('Could not calculate distance')
        }

        const distanceInKm = distanceInMeters / 1000

        // Extract address components
        const addressComponents = place.address_components || []
        let city = ''
        let street = ''
        let houseNumber = ''

        for (const component of addressComponents) {
          if (component.types.includes('locality')) {
            city = component.long_name
          }
          if (component.types.includes('route')) {
            street = component.long_name
          }
          if (component.types.includes('street_number')) {
            houseNumber = component.long_name
          }
        }

        // Validate distance (50km limit)
        const isValid = distanceInKm <= 50

        if (!isValid) {
          setError(`הכתובת שנבחרה נמצאת ${distanceInKm.toFixed(1)} ק"מ מעכו. אנחנו מספקים שירות רק ברדיוס 50 ק"מ.`)
        }

        onAddressSelect({
          fullAddress: place.formatted_address || '',
          city,
          street,
          houseNumber,
          isValid,
          distance: distanceInKm,
        })
      } catch (err) {
        console.error('Distance calculation error:', err)
        setError('שגיאה בבדיקת המרחק. אנא נסו שנית')
      } finally {
        setIsValidating(false)
      }
    })

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [isLoaded, onAddressSelect])

  if (loadError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
        שגיאה בטעינת Google Maps
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-gray-600 animate-pulse">
        טוען...
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="text"
        defaultValue={value}
        placeholder="התחילו להקליד כתובת (עיר, רחוב, מספר בית)..."
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900"
        disabled={isValidating}
      />

      {isValidating && (
        <p className="text-sm text-blue-600 flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          בודק מרחק מעכו...
        </p>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <p className="text-xs text-gray-500">
        אנא בחרו כתובת מהרשימה שמופיעה. אנחנו מספקים שירות ברדיוס 50 ק"מ מעכו.
      </p>
    </div>
  )
}
