import { useMemo, useReducer } from "react";
import { CartContext } from "./useCart"; 
function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, qty: i.qty + (action.qty || 1) } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.product, qty: action.qty || 1 }],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}


export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [
    { id: '1', name: 'Aero Wireless Headphones', price: 349.00, qty: 1, image: '/products/headphones.png', category: 'Audio' },
    { id: '2', name: 'Meridian Watch', price: 289.00, qty: 2, image: '/products/watch.png', category: 'Wearables' }
  ] });

  const value = useMemo(() => {
    const count = state.items.reduce((n, i) => n + i.qty, 0);
    const subtotal = +state.items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);
    const items = state.items.map((i) => ({ ...i, quantity: i.qty }));
    
    const setQty = (id, qty) => dispatch({ type: "SET_QTY", id, qty });
    const clear = () => dispatch({ type: "CLEAR" });
    
    return {
      items,
      count,
      itemCount: count,
      subtotal,
      total: subtotal, 
      shipping: 0, 
      addItem: (product, qty) => dispatch({ type: "ADD", product, qty }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      setQty,
      updateQuantity: setQty, 
      clear,
      clearCart: clear, 
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}