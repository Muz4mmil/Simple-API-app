'use client'

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

interface Product {
  id: Number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: {
    rate: number,
    count: number
  }
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      setProducts(data)
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    if (!products) return null
    if (!query) return products

    return products.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase())
    )
  }, [products, query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="[family-name:var(--font-geist-sans)] flex items-center justify-center flex-col w-screen">
      <h1 className="text-3xl font-bold mt-10 text-center">Simple API app</h1>

      <form onSubmit={handleSubmit} className="flex gap-4 mt-10">
        <input
          type="text"
          className="px-4 py-2 rounded-full border-2 border-black w-80"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..." 
          value={query}
        />
        <button type="submit" className="font-medium text-white bg-black rounded-full px-4 py-2">Search</button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 place-items-center mx-auto mt-10">
        {filteredProducts && filteredProducts.map((item, index: number) => (
          <div key={index} className="border border-gray-300 rounded-xl p-4 max-w-72 h-full flex flex-col gap-2 shadow-xl">
            <Image src={item.image} height={200} width={200} objectFit="contain" alt={item.title} className="h-[200px] w-full mx-auto text-center object-contain" />
            <h3 className="text-xl font-bold line-clamp-2 flex-grow">{item.title}</h3>
            <p className="line-clamp-3">{item.description}</p>
            <p className="text-xl font-bold">$ {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}