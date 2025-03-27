import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useStateContext } from '../context/state-context'
import emptyCart from '../images/Cart-Transparent-PNG.jpg'

const Cart = () => {
  const {
    totalPrice,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext()

  const handleCheckOut = async () => {
    alert('Checkout')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        exit={{ opacity: 0, x: '100%' }}
        className="fixed top-0 right-0 w-full max-w-lg h-screen bg-white shadow-lg z-[212] flex flex-col"
      >
        <div className="flex justify-between items-center p-6">
          <h2 className="text-2xl font-semibold text-primary">Shopping Cart</h2>
          <button
            onClick={() => setShowCart(false)}
            className="text-2xl text-primary hover:text-secondary transition-colors"
          >
            <AiOutlineClose />
          </button>
        </div>

        {cartItems.length < 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-6"
          >
            <Image
              src={emptyCart}
              alt="Empty cart image"
              height={300}
              width={340}
              className="mx-auto"
            />
            <h3 className="font-semibold text-4xl text-primary mt-4">
              Your Cart Is Empty
            </h3>
            <p className="text-sm text-gray-500 mt-4 text-center">
              Looks like you have not added anything to your cart. Go ahead &
              explore top categories
            </p>

            <button
              type="button"
              onClick={() => setShowCart(false)}
              className="mt-8 px-6 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </button>
          </motion.div>
        )}

        {cartItems.length >= 1 && (
          <>
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4 p-4"
                  >
                    <Image
                      width={160}
                      height={240}
                      src={item?.image}
                      className="w-32 h-48 object-cover rounded-md"
                      alt={item.name}
                    />

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h5 className="text-xl text-primary">{item.name}</h5>
                        <h4 className="text-xl text-primary">₹{item.price}</h4>
                      </div>
                      <p className="text-lg mt-1">{item.weight}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              className="px-3 py-1 cursor-pointer text-red-500 border-r border-gray-300 flex items-center justify-center"
                              onClick={() => toggleCartItemQuanitity(item.id, 'dec')}
                            >
                              <AiOutlineMinus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 border-r border-gray-300 flex items-center justify-center min-w-[2rem]">
                              {item.quantity}
                            </span>
                            <button
                              className="px-3 py-1 cursor-pointer text-green-600 flex items-center justify-center"
                              onClick={() => toggleCartItemQuanitity(item.id, 'inc')}
                            >
                              <AiOutlinePlus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="text-2xl text-red-500 cursor-pointer hover:text-red-600 transition-colors"
                          onClick={() => onRemove(item)}
                        >
                          <TiDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="p-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">Subtotal:</h3>
                <h3 className="text-2xl font-semibold">${totalPrice}</h3>
              </div>
              <button
                type="button"
                className="w-full py-3 bg-green-800 text-white rounded-md hover:bg-green-700 transition-colors"
                onClick={handleCheckOut}
              >
                Pay with stripe
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Cart
