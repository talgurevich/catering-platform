'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

interface AddToCartButtonProps {
  product: {
    id: string
    name_he: string
    price: any
    unit_label: string
    image_url?: string | null
    prep_time_days: number
    ProductOption: Array<{
      id: string
      option_name: string
      price_modifier: any
    }>
    max_options_select: number
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        // Remove option if already selected
        return prev.filter(id => id !== optionId)
      } else {
        // Add option (no limit)
        return [...prev, optionId]
      }
    })
  }

  const handleAddToCart = () => {
    const selectedOptionsData = product.ProductOption
      .filter(opt => selectedOptions.includes(opt.id))
      .map(opt => ({
        id: opt.id,
        name: opt.option_name,
        price_modifier: Number(opt.price_modifier),
      }))

    addItem({
      productId: product.id,
      name: product.name_he,
      price: Number(product.price),
      quantity,
      unit_label: product.unit_label,
      image_url: product.image_url || undefined,
      selectedOptions: selectedOptionsData,
      prep_time_days: product.prep_time_days,
    })

    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const totalPrice = Number(product.price) +
    product.ProductOption
      .filter(opt => selectedOptions.includes(opt.id))
      .reduce((sum, opt) => sum + Number(opt.price_modifier), 0)

  return (
    <div className="space-y-6">
      {/* Options Selection (if any) */}
      {product.ProductOption.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold text-gray-900">
              בחרו אפשרויות
            </h3>
            {selectedOptions.length > 0 && (
              <span className="text-sm font-bold text-yellow-600">
                {selectedOptions.length} נבחרו
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2">
            {product.ProductOption.map((option) => {
              const isSelected = selectedOptions.includes(option.id)

              return (
                <label
                  key={option.id}
                  className={`flex items-center justify-between p-4 border-2 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleOptionToggle(option.id)}
                      className="w-5 h-5 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                    />
                    <span className="font-medium text-gray-900">
                      {option.option_name}
                    </span>
                  </div>
                  {Number(option.price_modifier) > 0 && (
                    <span className="font-bold text-yellow-600">
                      +₪{option.price_modifier.toString()}
                    </span>
                  )}
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="font-heading text-lg font-bold text-gray-900">כמות:</span>
        <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors font-bold text-xl text-gray-900"
            type="button"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value)
              if (!isNaN(val) && val >= 1) {
                setQuantity(val)
              }
            }}
            className="w-16 px-2 py-2 font-bold text-lg text-center text-gray-900 border-0 focus:outline-none focus:ring-0"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition-colors font-bold text-xl text-gray-900"
            type="button"
          >
            +
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <span className="font-heading text-xl font-bold text-gray-900">סה״כ:</span>
        <span className="font-heading text-3xl font-bold text-gray-900">
          ₪{(totalPrice * quantity).toFixed(2)}
        </span>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full px-8 py-4 bg-yellow-400 text-gray-900 rounded-xl font-bold text-xl hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 relative overflow-hidden"
      >
        {showSuccess ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            נוסף לעגלה!
          </span>
        ) : (
          'הוסף לעגלה'
        )}
      </button>
    </div>
  )
}
