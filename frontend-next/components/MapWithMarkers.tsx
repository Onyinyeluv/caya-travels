'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

type Point = { id: string; lat: number; lng: number; title?: string }
type Props = { points: Point[]; center?: { lat: number; lng: number } }

export default function MapWithMarkers({ points, center }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  // If there are no points and no center, render a friendly placeholder
  if ((!points || points.length === 0) && !center) {
    return <div style={{ width: '100%', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', border: '1px solid #eee' }}>No locations to show</div>
  }

  useEffect(() => {
    if (!mapRef.current) return
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
    if (!mapInstance.current) {
      mapInstance.current = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center ? [center.lng, center.lat] : points[0] ? [points[0].lng, points[0].lat] : [0, 0],
        zoom: 4
      })
    }

    // remove old markers
    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    points.forEach((p) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([p.lng, p.lat])
        .setPopup(new mapboxgl.Popup({ offset: 12 }).setText(p.title || ''))
        .addTo(mapInstance.current!)
      markersRef.current.push(marker)
    })

    if (center && mapInstance.current) {
      mapInstance.current.setCenter([center.lng, center.lat])
      mapInstance.current.setZoom(10)
    } else if (points.length === 1 && mapInstance.current) {
      mapInstance.current.setCenter([points[0].lng, points[0].lat])
      mapInstance.current.setZoom(12)
    }

    return () => {
      // cleanup markers
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []
    }
  }, [points, center])

  return <div ref={mapRef} style={{ width: '100%', height: 400 }} />
}
