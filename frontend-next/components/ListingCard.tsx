'use client'

import React from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'

interface ListingCardProps {
  listing: any
  compact?: boolean
}

export default function ListingCard({ listing, compact = false }: ListingCardProps) {
  const imageUrl = listing.imagePath 
    ? supabase.storage.from('listings').getPublicUrl(listing.imagePath).data.publicUrl
    : null

  const price = listing.priceCents ? `$${(listing.priceCents / 100).toFixed(0)}` : 'Free'
  const isPro gram = listing.type === 'PROGRAM'

  return (
    <Link href={`/listings/${listing.id}`}>
      <div className="card hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
        {imageUrl && (
          <div className="relative w-full h-48 mb-4 -mt-6 -mx-6 rounded-t-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                isProgram ? 'bg-primary text-gray-900' : 'bg-blue-600 text-white'
              }`}>
                {isProgram ? 'Program' : 'Travel'}
              </span>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900 flex-1 line-clamp-2">
              {listing.title}
            </h3>
          </div>

          {listing.description && !compact && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
              {listing.description}
            </p>
          )}

          {isProgram && listing.program?.degree && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700">{listing.program.degree}</p>
              {listing.program.intakeStart && (
                <p className="text-xs text-gray-500 mt-1">
                  Intake: {new Date(listing.program.intakeStart).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <div>
              {listing.priceCents > 0 ? (
                <>
                  <p className="text-2xl font-bold text-gray-900">{price}</p>
                  {isProgram && listing.program?.applicationFeeCents && (
                    <p className="text-xs text-gray-500">
                      + ${(listing.program.applicationFeeCents / 100).toFixed(0)} application fee
                    </p>
                  )}
                </>
              ) : (
                <p className="text-lg font-semibold text-primary">Free to Apply</p>
              )}
            </div>
            <div className="text-primary font-medium text-sm">
              View Details →
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
