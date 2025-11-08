import Script from 'next/script'

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.breadstationakko.co.il',
    name: 'Bread Station Akko - תחנת לחם עכו',
    alternateName: 'BreadStation Akko',
    description: 'קייטרינג מקצועי מעכו - מגשי אירוח, כריכים טריים, מאפים ביתיים ומנות לאירועים. כשר למהדרין בהשגחת הרבנות עכו.',
    url: 'https://www.breadstationakko.co.il',
    telephone: '+972-50-267-0040',
    priceRange: '₪₪',
    image: 'https://www.breadstationakko.co.il/images/breadstation-official-logo.png',
    logo: 'https://www.breadstationakko.co.il/images/breadstation-official-logo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'עכו',
      addressRegion: 'צפון',
      addressCountry: 'IL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.9276,
      longitude: 35.0838,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    servesCuisine: ['כשר', 'מאפים', 'כריכים', 'מגשי אירוח'],
    currenciesAccepted: 'ILS',
    paymentAccepted: 'Cash, Credit Card',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 32.9276,
        longitude: 35.0838,
      },
      geoRadius: '50000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'קייטרינג ומגשי אירוח',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'מגשי אירוח',
            description: 'מגשי אירוח מקצועיים לאירועים',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'כריכים טריים',
            description: 'כריכים טריים ואיכותיים',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'מאפים ביתיים',
            description: 'מאפים טריים מוכנים בבית',
          },
        },
      ],
    },
    sameAs: [
      // Add social media links here when available
      // 'https://www.facebook.com/breadstationakko',
      // 'https://www.instagram.com/breadstationakko',
    ],
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
