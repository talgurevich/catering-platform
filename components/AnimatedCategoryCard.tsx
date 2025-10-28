'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface AnimatedCategoryCardProps {
  category: {
    id: string
    name_he: string
    slug: string
    Product: Array<{
      image_url?: string | null
    }>
  }
  index: number
}

export default function AnimatedCategoryCard({ category, index }: AnimatedCategoryCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <Link
      ref={cardRef}
      href={`/categories/${category.slug}`}
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="aspect-video bg-gradient-to-br from-yellow-100 to-orange-100 relative overflow-hidden">
        {category.Product[0]?.image_url ? (
          <Image
            src={category.Product[0].image_url}
            alt={category.name_he}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-200 to-orange-200">
            <span className="text-7xl filter drop-shadow-lg">🍽️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
          {category.name_he}
        </h3>
        <div className="flex items-center text-gray-600 text-sm">
          <span>לחצו לצפייה במוצרים</span>
          <svg className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
