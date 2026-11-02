'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type CartItem = {
  id: string
  handle: string
  title: string
  options: { name: string; value: string }[]
  qty: number
  unitPrice: number
  total: number
  pieces: number
  colors: string
  logoName: string
  sizes: string
  notes: string
}

type Cart = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'id'>) => void
  remove: (id: string) => void
  clear: () => void
  subtotal: number
  count: number
}

const CartCtx = createContext<Cart | null>(null)
const KEY = 'cd_shop_cart_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {}
  }, [items, loaded])

  const value: Cart = {
    items,
    add: (item) => setItems((prev) => [...prev, { ...item, id: `${item.handle}-${Date.now()}` }]),
    remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
    clear: () => setItems([]),
    subtotal: items.reduce((s, i) => s + i.total, 0),
    count: items.length,
  }

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
