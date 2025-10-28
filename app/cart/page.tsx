'use client'

import CustomerHeader from '@/components/CustomerHeader'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'

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
    setDeliveryDate,
    setDeliveryTimeSlot,
    setDeliveryLocation,
    setOrderNotes
  } = useCart()

  // Calculate minimum date (48 hours from now)
  const getMinDate = () => {
    const date = new Date()
    date.setHours(date.getHours() + 48)
    return date.toISOString().split('T')[0]
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
                                item.selectedOptions.reduce((sum, opt) => sum + opt.price_modifier, 0)) *
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

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      מיקום אספקה <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="deliveryLocation"
                          value="akko"
                          checked={deliveryLocation === 'akko'}
                          onChange={(e) => setDeliveryLocation(e.target.value as 'akko')}
                          className="ml-3 w-4 h-4 text-yellow-400 focus:ring-yellow-400"
                        />
                        <div className="flex-grow">
                          <span className="font-semibold text-gray-900">עכו והסביבה</span>
                          <span className="block text-sm text-green-600">משלוח חינם</span>
                        </div>
                      </label>
                      <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="deliveryLocation"
                          value="outside-akko"
                          checked={deliveryLocation === 'outside-akko'}
                          onChange={(e) => setDeliveryLocation(e.target.value as 'outside-akko')}
                          className="ml-3 w-4 h-4 text-yellow-400 focus:ring-yellow-400"
                        />
                        <div className="flex-grow">
                          <span className="font-semibold text-gray-900">מחוץ לעכו</span>
                          <span className="block text-sm text-gray-600">+₪50 דמי משלוח</span>
                        </div>
                      </label>
                    </div>
                  </div>

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
                    <span>סכום ביניים:</span>
                    <span className="font-bold">₪{totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>דמי משלוח:</span>
                    <span className="font-bold">
                      {deliveryFee === 0 ? 'חינם' : `₪${deliveryFee.toFixed(2)}`}
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

                {!deliveryDate || !deliveryTimeSlot || !deliveryLocation ? (
                  <div className="mb-4">
                    <button
                      disabled
                      className="block w-full px-8 py-4 bg-gray-300 text-gray-500 rounded-xl font-bold text-xl text-center cursor-not-allowed mb-2"
                    >
                      המשך לתשלום
                    </button>
                    <p className="text-sm text-red-600 text-center">
                      יש לבחור תאריך, טווח שעות ומיקום אספקה
                    </p>
                  </div>
                ) : (
                  <Link
                    href="/checkout"
                    className="block w-full px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold text-xl text-center hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 mb-4"
                  >
                    המשך לתשלום
                  </Link>
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
