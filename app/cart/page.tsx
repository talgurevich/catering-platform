'use client'

import CustomerHeader from '@/components/CustomerHeader'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import AddressAutocomplete from '@/components/AddressAutocomplete'
import { useState, useEffect } from 'react'

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
    deliveryDate,
    deliveryTimeSlot,
    deliveryLocation,
    deliveryFee,
    orderNotes,
    deliveryAddress,
    deliveryCity,
    deliveryStreet,
    deliveryHouseNumber,
    setDeliveryDate,
    setDeliveryTimeSlot,
    setDeliveryLocation,
    setOrderNotes,
    setDeliveryAddress,
    setDeliveryCity,
    setDeliveryStreet,
    setDeliveryHouseNumber,
  } = useCart()

  const [isAddressValid, setIsAddressValid] = useState(false)
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'delivery' | 'pickup'>('delivery')

  // Sync fulfillment method with delivery location
  useEffect(() => {
    if (deliveryLocation === 'pickup') {
      setFulfillmentMethod('pickup')
    } else if (deliveryLocation === 'akko' || deliveryLocation === 'outside-akko') {
      setFulfillmentMethod('delivery')
    }
  }, [deliveryLocation])

  // Calculate minimum date (48 hours from now)
  const getMinDate = () => {
    const date = new Date()
    date.setHours(date.getHours() + 48)
    return date.toISOString().split('T')[0]
  }

  // Handle fulfillment method change
  const handleFulfillmentMethodChange = (method: 'delivery' | 'pickup') => {
    setFulfillmentMethod(method)
    if (method === 'pickup') {
      setDeliveryLocation('pickup')
      // Clear address fields when switching to pickup
      setDeliveryAddress(null)
      setDeliveryCity(null)
      setDeliveryStreet(null)
      setDeliveryHouseNumber(null)
      setIsAddressValid(false)
    } else {
      // Reset to null when switching to delivery, user will need to enter address
      setDeliveryLocation(null)
    }
  }

  // Handle address selection from autocomplete
  const handleAddressSelect = (address: {
    fullAddress: string
    city: string
    street: string
    houseNumber: string
    isValid: boolean
    distance?: number
  }) => {
    setDeliveryAddress(address.fullAddress)
    setDeliveryCity(address.city)
    setDeliveryStreet(address.street)
    setDeliveryHouseNumber(address.houseNumber)
    setIsAddressValid(address.isValid)

    // Auto-select delivery location based on distance
    // If distance is available and <= 15km, consider it Akko area (free delivery)
    // Otherwise, outside Akko (50 NIS)
    if (address.isValid && address.distance !== undefined) {
      setDeliveryLocation(address.distance <= 15 ? 'akko' : 'outside-akko')
    }
  }

  // Time slots (2-hour blocks)
  const timeSlots = [
    '08:00-10:00',
    '10:00-12:00',
    '12:00-14:00',
    '14:00-16:00',
    '16:00-18:00',
    '18:00-20:00',
    '20:00-22:00'
  ]

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <CustomerHeader />
        <main className="flex-grow bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-20" dir="rtl">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="font-heading text-3xl font-bold text-gray-900 mb-4">
              העגלה שלכם ריקה
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              הוסיפו מוצרים מהתפריט שלנו כדי להתחיל
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:scale-105"
            >
              חזרה לתפריט
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const maxPrepTime = Math.max(...items.map(item => item.prep_time_days))

  // Generate WhatsApp message with cart details
  const generateWhatsAppMessage = () => {
    let message = `🛒 *הזמנה חדשה מהאתר*\n\n`

    // Items
    message += `*פריטים:*\n`
    items.forEach((item, index) => {
      const itemTotal = (item.price + (item.selectedOptions.length > 0
        ? Math.max(...item.selectedOptions.map(opt => opt.price_modifier))
        : 0)) * item.quantity
      message += `${index + 1}. ${item.name} x${item.quantity} - ₪${itemTotal.toFixed(2)}\n`
      if (item.selectedOptions.length > 0) {
        message += `   אפשרויות: ${item.selectedOptions.map(opt => opt.name).join(', ')}\n`
      }
    })

    message += `\n`

    // Delivery details
    message += `*פרטי אספקה:*\n`
    message += `📅 תאריך: ${deliveryDate || 'לא נבחר'}\n`
    message += `🕐 שעות: ${deliveryTimeSlot || 'לא נבחר'}\n`

    if (fulfillmentMethod === 'pickup') {
      message += `📍 איסוף עצמי מהחנות\n`
    } else {
      message += `📍 משלוח לכתובת: ${deliveryAddress || 'לא צוין'}\n`
      message += `   (${deliveryLocation === 'akko' ? 'עכו והסביבה - משלוח חינם' : 'מחוץ לעכו - ₪50 משלוח'})\n`
    }

    // Notes
    if (orderNotes) {
      message += `\n📝 *הערות:* ${orderNotes}\n`
    }

    // Total
    message += `\n💰 *סה״כ לתשלום: ₪${(totalPrice + deliveryFee).toFixed(2)}*`

    return encodeURIComponent(message)
  }

  const whatsappUrl = `https://wa.me/972502670040?text=${generateWhatsAppMessage()}`

  return (
    <div className="min-h-screen flex flex-col">
      <CustomerHeader />

      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white py-12" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              עגלת הקניות שלי
            </h1>
            <p className="text-xl text-gray-600">
              {totalItems} {totalItems === 1 ? 'פריט' : 'פריטים'} בעגלה
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Prep Time Notice */}
              {maxPrepTime > 0 && (
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
                  <svg
                    className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-bold text-blue-900">
                      זמן הכנה: {maxPrepTime} ימים מראש
                    </p>
                    <p className="text-sm text-blue-700">
                      הזמנה זו דורשת הזמנה מוקדמת של לפחות {maxPrepTime} ימי עסקים
                    </p>
                  </div>
                </div>
              )}

              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl overflow-hidden flex-shrink-0">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl">🍽️</span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            ₪{item.price.toFixed(2)} / {item.unit_label}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2"
                          aria-label="הסר מהעגלה"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Selected Options */}
                      {item.selectedOptions.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-semibold text-gray-700 mb-1">אפשרויות:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.selectedOptions.map((option, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-1 bg-yellow-50 text-yellow-800 text-xs font-medium rounded-full"
                              >
                                {option.name}
                                {option.price_modifier > 0 && (
                                  <span className="mr-1 font-bold">
                                    +₪{option.price_modifier.toFixed(2)}
                                  </span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quantity Controls & Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 transition-colors font-bold text-gray-900"
                            type="button"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value)
                              if (!isNaN(val) && val >= 1) {
                                updateQuantity(item.id, val)
                              }
                            }}
                            className="w-12 px-2 py-1 font-bold text-center text-gray-900 border-0 focus:outline-none focus:ring-0"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 transition-colors font-bold text-gray-900"
                            type="button"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-left">
                          <p className="font-heading text-2xl font-bold text-gray-900">
                            ₪
                            {(
                              (item.price +
                                (item.selectedOptions.length > 0
                                  ? Math.max(...item.selectedOptions.map(opt => opt.price_modifier))
                                  : 0)) *
                              item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="w-full px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors"
              >
                רוקן עגלה
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                  סיכום הזמנה
                </h2>

                {/* Delivery Date & Time Selection */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      תאריך אספקה <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={deliveryDate || ''}
                      min={getMinDate()}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      הזמנה מראש של 48 שעות לפחות
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      טווח שעות <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={deliveryTimeSlot || ''}
                      onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900"
                      required
                    >
                      <option value="">בחר טווח שעות</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fulfillment Method Selection */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      אופן קבלת ההזמנה <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        fulfillmentMethod === 'delivery'
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-gray-300 hover:border-yellow-400'
                      }`}>
                        <input
                          type="radio"
                          name="fulfillmentMethod"
                          value="delivery"
                          checked={fulfillmentMethod === 'delivery'}
                          onChange={() => handleFulfillmentMethodChange('delivery')}
                          className="ml-3 w-5 h-5 text-yellow-400 focus:ring-yellow-400"
                        />
                        <div className="flex-grow">
                          <div className="font-bold text-gray-900">משלוח לכתובת</div>
                          <div className="text-sm text-gray-600">משלוח חינם עד 15 ק"מ, ₪50 עד 50 ק"מ</div>
                        </div>
                      </label>
                      <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        fulfillmentMethod === 'pickup'
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-gray-300 hover:border-yellow-400'
                      }`}>
                        <input
                          type="radio"
                          name="fulfillmentMethod"
                          value="pickup"
                          checked={fulfillmentMethod === 'pickup'}
                          onChange={() => handleFulfillmentMethodChange('pickup')}
                          className="ml-3 w-5 h-5 text-yellow-400 focus:ring-yellow-400"
                        />
                        <div className="flex-grow">
                          <div className="font-bold text-gray-900">איסוף עצמי</div>
                          <div className="text-sm text-gray-600">איסוף מהחנות בברכה צפירה 3, עכו - חינם</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Address - Only show for delivery */}
                  {fulfillmentMethod === 'delivery' && (
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        כתובת אספקה <span className="text-red-500">*</span>
                      </label>
                      <AddressAutocomplete
                        onAddressSelect={handleAddressSelect}
                        value={deliveryAddress || ''}
                      />
                    </div>
                  )}

                  {deliveryLocation && (
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-gray-900">
                            {deliveryLocation === 'pickup'
                              ? 'איסוף עצמי מהחנות'
                              : deliveryLocation === 'akko'
                              ? 'עכו והסביבה (עד 15 ק"מ)'
                              : 'מחוץ לעכו (15-50 ק"מ)'}
                          </span>
                          <span className="block text-sm mt-1">
                            {deliveryLocation === 'pickup' || deliveryLocation === 'akko' ? (
                              <span className="text-green-600 font-bold">חינם</span>
                            ) : (
                              <span className="text-gray-600">דמי משלוח: ₪50</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      הערות להזמנה
                    </label>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="הוסיפו הערות מיוחדות להזמנה (אופציונלי)"
                      rows={3}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 text-gray-900 resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>סה״כ פריטים:</span>
                    <span className="font-bold">{totalItems}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>סכום ביניים (לפני מע״מ):</span>
                    <span className="font-bold">₪{((totalPrice + deliveryFee) / 1.18).toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>מע״מ (18%):</span>
                    <span className="font-bold">
                      ₪{((totalPrice + deliveryFee) - ((totalPrice + deliveryFee) / 1.18)).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>דמי משלוח:</span>
                    <span className="font-bold">
                      {deliveryLocation === 'pickup' ? (
                        <span className="text-green-600">איסוף עצמי - חינם</span>
                      ) : deliveryFee === 0 ? (
                        <span className="text-green-600">משלוח חינם</span>
                      ) : (
                        `כלול במחיר`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xl font-bold text-gray-900">
                        סה״כ לתשלום:
                      </span>
                      <span className="font-heading text-3xl font-bold text-gray-900">
                        ₪{(totalPrice + deliveryFee).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {!deliveryDate || !deliveryTimeSlot || !deliveryLocation || (deliveryLocation !== 'pickup' && !isAddressValid) ? (
                  <div className="mb-4">
                    <button
                      disabled
                      className="block w-full px-8 py-4 bg-gray-300 text-gray-500 rounded-xl font-bold text-xl text-center cursor-not-allowed mb-2"
                    >
                      <span className="flex items-center justify-center gap-3">
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        שליחת הזמנה בוואטסאפ
                      </span>
                    </button>
                    <p className="text-sm text-red-600 text-center">
                      {!isAddressValid && deliveryAddress && deliveryLocation !== 'pickup'
                        ? 'הכתובת חייבת להיות ברדיוס 50 ק"מ מעכו'
                        : deliveryLocation === 'pickup'
                        ? 'יש למלא תאריך וטווח שעות'
                        : 'יש למלא תאריך, טווח שעות וכתובת אספקה תקינה'}
                    </p>
                  </div>
                ) : (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-xl text-center hover:bg-green-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 mb-4"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      שליחת הזמנה בוואטסאפ
                    </span>
                  </a>
                )}

                <Link
                  href="/"
                  className="block w-full px-8 py-3 bg-gray-100 text-gray-900 rounded-xl font-bold text-center hover:bg-gray-200 transition-colors"
                >
                  המשך בקניות
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
