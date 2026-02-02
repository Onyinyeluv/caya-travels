'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

type Props = { lat: number; lng: number }

export default function Map({ lat, lng }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return
    if (!mapInstance.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
      mapInstance.current = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 12
      })

      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapInstance.current)
    } else {
      mapInstance.current.setCenter([lng, lat])
    }

    return () => {
      // do not remove map to preserve in dev HMR issues
    }
  }, [lat, lng])

  return <div ref={mapRef} style={{ width: '100%', height: 300 }} />
}
