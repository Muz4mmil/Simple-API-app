'use client'

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function Product() {
	const params = useParams()
	const [product, setProduct] = useState<Product>()

	useEffect(() => {
		const fetchProduct = async () => {
			const response = await fetch(`https://fakestoreapi.com/products/${params.id}`)
			const data = await response.json()
			setProduct(data)
		}

		fetchProduct()
	}, [])

	return (
		product &&
		<div className="mx-auto max-w-5xl min-h-screen w-full bg-gray-50">
			<h1 className="text-3xl font-bold my-10 text-center">Simple API app</h1>

			<Link href={'/'} className="font-bold my-10">{'<'} Back</Link>
			<div className=" px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="h-96 w-96">
					<Image src={product.image} height={500} width={500} objectFit="contain" alt={product.title} className="h-[500px] w-full mx-auto text-center object-contain" />
				</div>

				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
						<div className="mt-4 flex items-center space-x-4">
							<div className="flex items-center">
								{[...Array(5)].map((_, i) => (
									<span
										key={i}
										className={`text-2xl ${i < Math.floor(product.rating.rate)
											? 'text-yellow-400'
											: 'text-gray-300'
											}`}
									>
										★
									</span>
								))}
							</div>
							<span className="text-gray-600">
								{product.rating.rate} ({product.rating.count} reviews)
							</span>
						</div>
					</div>

					<div className="border-t border-b border-gray-200 py-4">
						<span className="text-4xl font-bold text-gray-900">
							${product.price.toFixed(2)}
						</span>
					</div>

					<div>
						<h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
						<p className="text-gray-600 leading-relaxed">
							{product.description}
						</p>
					</div>

					<div className="border-t border-gray-200 pt-6 space-y-4">
						<div>
							<span className="text-gray-600">Category:</span>
							<span className="ml-2 text-gray-900 capitalize">{product.category}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}