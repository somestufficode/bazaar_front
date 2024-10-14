'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiSearch, FiShoppingBag, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
    {children}
  </Link>
)

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Cool T-Shirt', price: 19.99, quantity: 1 },
    { id: '2', name: 'Stylish Jeans', price: 49.99, quantity: 2 },
  ])
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <nav className="bg-background shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-primary">
              Urban Bazaar
            </Link>
            <div className="hidden md:flex space-x-1">
              <NavItem href="/collections/women">WOMEN</NavItem>
              <NavItem href="/collections/men">MEN</NavItem>
              <NavItem href="/collections/girls">GIRLS</NavItem>
              <NavItem href="/collections/boys">BOYS</NavItem>
              <NavItem href="/collections/baby-toddler">BABY & TODDLER</NavItem>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <FiSearch className="h-5 w-5" />
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <FiShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>
                    You have {totalItems} item(s) in your cart
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FiX className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <Button className="w-full">Checkout</Button>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Account</SheetTitle>
                  <SheetDescription>
                    Manage your account settings
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <Button variant="outline" className="w-full">Sign In</Button>
                  <Button variant="outline" className="w-full">Register</Button>
                  <Button variant="outline" className="w-full">My Orders</Button>
                  <Button variant="outline" className="w-full">Settings</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute inset-x-0 top-full bg-background shadow-md p-4"
          >
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" className="ml-2">
                Search
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
                className="ml-2"
              >
                <FiX className="h-5 w-5" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}