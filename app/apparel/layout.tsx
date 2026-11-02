import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/components/shop/CartContext'
import { ShopNav } from '@/components/shop/ui'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="pt-16">
        <ShopNav />
        {children}
      </main>
      <Footer />
    </CartProvider>
  )
}
