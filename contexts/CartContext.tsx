'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  unit_label: string
  image_url?: string
  selectedOptions: {
    id: string
    name: string
    price_modifier: number
  }[]
  prep_time_days: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  deliveryDate: string | null
  deliveryTimeSlot: string | null
  deliveryLocation: 'akko' | 'outside-akko' | 'pickup' | null
  deliveryFee: number
  orderNotes: string
  deliveryAddress: string | null
  deliveryCity: string | null
  deliveryStreet: string | null
  deliveryHouseNumber: string | null
  setDeliveryDate: (date: string | null) => void
  setDeliveryTimeSlot: (slot: string | null) => void
  setDeliveryLocation: (location: 'akko' | 'outside-akko' | 'pickup' | null) => void
  setOrderNotes: (notes: string) => void
  setDeliveryAddress: (address: string | null) => void
  setDeliveryCity: (city: string | null) => void
  setDeliveryStreet: (street: string | null) => void
  setDeliveryHouseNumber: (houseNumber: string | null) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null)
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState<string | null>(null)
  const [deliveryLocation, setDeliveryLocation] = useState<'akko' | 'outside-akko' | 'pickup' | null>(null)
  const [orderNotes, setOrderNotes] = useState<string>('')
  const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null)
  const [deliveryCity, setDeliveryCity] = useState<string | null>(null)
  const [deliveryStreet, setDeliveryStreet] = useState<string | null>(null)
  const [deliveryHouseNumber, setDeliveryHouseNumber] = useState<string | null>(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedDeliveryDate = localStorage.getItem('deliveryDate')
    const savedDeliveryTimeSlot = localStorage.getItem('deliveryTimeSlot')
    const savedDeliveryLocation = localStorage.getItem('deliveryLocation')
    const savedOrderNotes = localStorage.getItem('orderNotes')
    const savedDeliveryAddress = localStorage.getItem('deliveryAddress')
    const savedDeliveryCity = localStorage.getItem('deliveryCity')
    const savedDeliveryStreet = localStorage.getItem('deliveryStreet')
    const savedDeliveryHouseNumber = localStorage.getItem('deliveryHouseNumber')

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as CartItem[]
        // Ensure all items have selectedOptions array (for backward compatibility)
        const migratedCart = parsedCart.map(item => ({
          ...item,
          selectedOptions: item.selectedOptions || []
        }))
        setItems(migratedCart)
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
    if (savedDeliveryDate) setDeliveryDate(savedDeliveryDate)
    if (savedDeliveryTimeSlot) setDeliveryTimeSlot(savedDeliveryTimeSlot)
    if (savedDeliveryLocation) setDeliveryLocation(savedDeliveryLocation as 'akko' | 'outside-akko' | 'pickup')
    if (savedOrderNotes) setOrderNotes(savedOrderNotes)
    if (savedDeliveryAddress) setDeliveryAddress(savedDeliveryAddress)
    if (savedDeliveryCity) setDeliveryCity(savedDeliveryCity)
    if (savedDeliveryStreet) setDeliveryStreet(savedDeliveryStreet)
    if (savedDeliveryHouseNumber) setDeliveryHouseNumber(savedDeliveryHouseNumber)

    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, isLoaded])

  // Save delivery date and time slot to localStorage
  useEffect(() => {
    if (isLoaded) {
      if (deliveryDate) {
        localStorage.setItem('deliveryDate', deliveryDate)
      } else {
        localStorage.removeItem('deliveryDate')
      }
    }
  }, [deliveryDate, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      if (deliveryTimeSlot) {
        localStorage.setItem('deliveryTimeSlot', deliveryTimeSlot)
      } else {
        localStorage.removeItem('deliveryTimeSlot')
      }
    }
  }, [deliveryTimeSlot, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      if (deliveryLocation) {
        localStorage.setItem('deliveryLocation', deliveryLocation)
      } else {
        localStorage.removeItem('deliveryLocation')
      }
    }
  }, [deliveryLocation, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      if (orderNotes) {
        localStorage.setItem('orderNotes', orderNotes)
      } else {
        localStorage.removeItem('orderNotes')
      }
    }
  }, [orderNotes, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      if (deliveryAddress) {
        localStorage.setItem('deliveryAddress', deliveryAddress)
      } else {
        localStorage.removeItem('deliveryAddress')
      }
    }
  }, [deliveryAddress, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      if (deliveryCity) {
        localStorage.setItem('deliveryCity', deliveryCity)
      } else {
        localStorage.removeItem('deliveryCity')
      }
    }
  }, [deliveryCity, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      if (deliveryStreet) {
        localStorage.setItem('deliveryStreet', deliveryStreet)
      } else {
        localStorage.removeItem('deliveryStreet')
      }
    }
  }, [deliveryStreet, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      if (deliveryHouseNumber) {
        localStorage.setItem('deliveryHouseNumber', deliveryHouseNumber)
      } else {
        localStorage.removeItem('deliveryHouseNumber')
      }
    }
  }, [deliveryHouseNumber, isLoaded])

  const addItem = (newItem: Omit<CartItem, 'id'>) => {
    setItems((currentItems) => {
      // Check if item with same product and options already exists
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(newItem.selectedOptions)
      )

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        return updatedItems
      } else {
        // Add new item with unique ID
        return [
          ...currentItems,
          {
            ...newItem,
            id: `${newItem.productId}-${Date.now()}`,
          },
        ]
      }
    })
  }

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    setDeliveryDate(null)
    setDeliveryTimeSlot(null)
    setDeliveryLocation(null)
    setOrderNotes('')
    setDeliveryAddress(null)
    setDeliveryCity(null)
    setDeliveryStreet(null)
    setDeliveryHouseNumber(null)
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = items.reduce((sum, item) => {
    // Use the maximum price modifier, not the sum of all modifiers
    const maxPriceModifier = item.selectedOptions?.length > 0
      ? Math.max(...item.selectedOptions.map(opt => opt.price_modifier))
      : 0
    return sum + (item.price + maxPriceModifier) * item.quantity
  }, 0)

  // Calculate delivery fee: 50 NIS for outside Akko, free for Akko and pickup
  const deliveryFee = deliveryLocation === 'outside-akko' ? 50 : 0

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
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
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
