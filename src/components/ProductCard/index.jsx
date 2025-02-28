import React, { startTransition, useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShare, FaMinus, FaPlus } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import styles from "./index.module.scss";
import Comment from "../Comment";
import { useNavigate, useParams } from "react-router-dom";

import callApi from "../../utils/axiosConfig";
import DiscountButton from "./button";

const OrderLazy = React.lazy(() => import('../Order'))



const ProductComponent = () => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState(null);
  const [discount, setDiscount] = useState(null)
  const [order, setOrder] = useState(false)
  const [dataOrder, setDataOrder] = useState(null)

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate('/404')
      return
    }
    const fetchProduct = async () => {
      try {
        const response = await callApi.get(`/product/detail/${id}`)
        const payload = response.data.metadata
        payload.images = [payload.product_thumb]
        payload.reviewCount = 0
        payload.product_attributes = Object.entries(payload.product_attributes)
          .map(([key, value]) => [key[0].toUpperCase() + key.slice(1), value])
        payload.product_technical = payload.product_attributes.map(([key, value]) => `${key}: ${value}`).join(', ')
        setProduct(payload)
      } catch (error) {
        navigate('/404')
      }
    }
    fetchProduct()
  }, [id])

  useEffect(() => {
    if (!product) return
    setToDataOrder()
  }, [discount, quantity, product])

  const handleAddToCart = async (product) => {
    const payload = {
      product_id: product._id,
      product_name: product.product_name,
      product_price: product.product_price,
      product_thumb: product.product_thumb,
      quantity: quantity
    }
    // try {
    //   const cart = await callApi.post('/cart/addtocart', payload, {
    //     requiresAuth: true,
    //   })
    //   toast.success('Added to cart')
    //   setToLocalStorage({
    //     key: '_MY_CART',
    //     values: cart.data.metadata.cart_preview
    //   })
    // } catch (error) {
    //   console.log('error: ', error)
    //   toast.error('Failed to add to cart')
    // }

    console.log(payload)

  }

  const getDiscountSelect = (data) => {
    setDiscount(data)
    setToDataOrder()
  }


  const handleBuyNow = () => {
    startTransition(() => {
      setOrder(true)
    })
  }

  const handlCloseOrder = () => {
    setOrder(false)
  }

  const handleAddQuantity = () => {
    setQuantity((prev) => Math.min(product?.product_quantity || 1, prev + 1))
  }
  const handleSubQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }
  const setToDataOrder = () => {
    if (!product) return
    setDataOrder({
      product: {
        product_id: product._id,
        product_price: product.product_price,
        product_quantity: quantity === 0 ? 1 : quantity
      },
      discount: discount && {
        discount_id: discount.discount_id,
        discount_type: discount.discount_type,
        discount_value: discount.discount_value
      }
    })
  }

  return (
    <div className={styles.productContainer}>
      {product && (
        <div className={styles.productWrapper}>
          <div className={styles.productGrid}>
            <ShowImage product={product} />

            <div className={styles.productInfo}>
              <h1>{product.product_name}</h1>
              <div className={styles.productMeta}>
                <div className={styles.rating}>
                  <span>{product.product_average_rating} ⭐ ({product.reviewCount} reviews)</span>
                </div>
                <button onClick={() => setIsFavorite(!isFavorite)}>
                  {isFavorite ? <FaHeart className={styles.favorite} /> : <FaRegHeart />}
                </button>
                <button><FaShare /></button>
              </div>

              <div className={styles.priceSection}>
                <span className={styles.currentPrice}>${
                  discount ? (product.product_price * quantity * (1 - discount.discountAmount / 100)).toFixed(2) :
                    (product.product_price * quantity).toFixed(2)}
                </span>
                {discount && (
                  <>

                    <span className={styles.originalPrice}>${(product.product_price * quantity).toFixed(2)}</span>
                    <span className={styles.discount}>{discount.discountAmount}% OFF</span>
                  </>
                )}
                < DiscountButton
                  product={
                    {
                      _id: product._id, shop_id: product.product_shop,
                      quantity: quantity, product_price: product.product_price
                    }
                  }
                  setDiscount={getDiscountSelect}
                />
              </div>

              <div className={styles.options}>
                <div style={{ display: 'flex' }}>
                  <div className={styles.option} style={{ marginRight: '30px' }}>
                    <label>{product?.product_attributes[0][0]}</label>
                    <div className={styles.choices}>
                      <button className={styles.selected}>{product?.product_attributes[0][1]}</button>
                    </div>
                  </div>
                  <div className={styles.option}>
                    <label>{product?.product_attributes[1][0]}</label>
                    <div className={styles.choices}>
                      <button className={styles.selected}>{product?.product_attributes[1][1]}</button>
                    </div>
                  </div>
                </div>

                <div className={styles.option}>
                  <label>{product?.product_attributes[2][0]}</label>
                  <div className={styles.choices}>
                    <button className={styles.selected}>{product?.product_attributes[2][1]}</button>
                  </div>
                </div>
              </div>

              <div className={styles.quantitySelector}>
                <button onClick={handleSubQuantity}><FaMinus /></button>
                <span>{quantity}</span>
                <button onClick={handleAddQuantity}><FaPlus /></button>
                <span style={{ marginLeft: '10px' }}>{product.product_quantity} available</span>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.addToCart}
                  onClick={() => handleAddToCart(product)}
                >
                  <MdShoppingCart size={23} style={{ margin: '0 5px -5px 0' }} /> Add to Cart</button>
                <button
                  className={styles.buyNow}
                  onClick={() => handleBuyNow(product)}
                >Buy Now</button>
              </div>
            </div>
          </div>
          <ProductTabs product={product} />

          <Comment />
        </div>
      )}
      {
        order && (
          <OrderLazy
            onClose={handlCloseOrder}
            productData={dataOrder}
          />
        )
      }
    </div>
  );
};



export default ProductComponent;



const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className={styles.productTabs}>
      <div className={styles.tabNav}>
        {["description", "technical"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={
              `${styles.tabButton} ${activeTab === tab ? styles.active : ""}`
            }
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {activeTab === "description" && <p>{product.product_description}</p>}
        {activeTab === "technical" && <p>{product.product_technical}</p>}
      </div>
    </div>
  );
};


const ShowImage = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);


  return (
    <div className={styles.imageGallery}>
      <div className={styles.mainImage}>
        <img src={product.images[selectedImage]} alt={product.name} />
      </div>
      <div className={styles.thumbnailGrid}>
        {product.images.map((images, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`${styles.thumbnail} ${selectedImage === index ? styles.selected : ""}`}
          >
            <img src={images} alt={`${product.product_name} ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  )
}

// const Discount = (product_id) => {

//   createdAt: "2025-02-11T09:15:35.365Z"
//   images: ['https://res.cloudinary.com/dvrmnwc54/image/upload/v1739265266/test/1739265265032-giay.jpg.jpg']
//   product_attributes: { size: '56', color: 'White', material: 'cotton' }
//   product_average_rating: 4.5
//   product_description: "Giày Real , chất lượng cao !!!"
//   product_name: "Giày Thể Thao"
//   product_price: 100
//   product_quantity: 20
//   product_shop: "67a1df8199fa29918c6c9228"
//   product_slug: "giay-the-thao"
//   product_thumb: "https://res.cloudinary.com/dvrmnwc54/image/upload/v1739265266/test/1739265265032-giay.jpg.jpg"
//   product_type: "Clothing"
//   product_variation: []
//   reviewCount: 0
//   _id: "67ab153716516221ca09eee0"
// }
