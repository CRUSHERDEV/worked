"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { marketplaceApi } from "@/lib/api/client";
import { Product } from "@/types/product";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { LoadingSpinner } from "@/components/loading/LoadingSpinner";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/forms/Button";
import Image from "next/image";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, isInCart } = useCart();

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await marketplaceApi.getProduct(productId);
      setProduct(data);
    } catch (error) {
      console.error("Failed to load product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : product.image 
    ? [product.image] 
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-4">
              {images.length > 0 ? (
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-primary-500"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-semibold mb-4">{product.name}</h1>
            
            {product.rating && (
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-2xl">★</span>
                <span className="ml-2 text-lg">
                  {product.rating.toFixed(1)} ({product.reviewCount || 0} reviews)
                </span>
              </div>
            )}

            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-500">
                ${product.price.toFixed(2)}
              </span>
              {product.currency && product.currency !== "USD" && (
                <span className="ml-2 text-gray-600">{product.currency}</span>
              )}
            </div>

            {product.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Specifications</h2>
                <dl className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm text-gray-600">{key}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Stock Status */}
            {product.stock !== undefined && (
              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                  disabled={product.stock !== undefined && quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={product.stock !== undefined && product.stock === 0}
                className="flex-1"
              >
                {isInCart(product.id) ? "Update Cart" : "Add to Cart"}
              </Button>
            </div>

            {/* Vendor Info */}
            {product.vendor && (
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">Sold by</p>
                <p className="font-semibold">{product.vendor.name}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

