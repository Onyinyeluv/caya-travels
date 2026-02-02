'use client'

import React from 'react'
import Link from 'next/link'
import Button from './ui/Button'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
}

export default function Hero({ 
  title = 'Caya Express Travels', 
  subtitle = 'Discover programs and travel packages worldwide. Apply or book with trusted partners.', 
  ctaText = 'Get Started', 
  ctaHref = '/search' 
}: HeroProps) {
  return (
    <section className="w-full bg-gradient-to-br from-white to-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href={ctaHref}>
                <Button variant="primary" size="lg">{ctaText}</Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg">Learn more</Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full max-w-lg">
            <div className="relative w-full aspect-square rounded-2xl shadow-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-white flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
              <svg className="w-48 h-48 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
