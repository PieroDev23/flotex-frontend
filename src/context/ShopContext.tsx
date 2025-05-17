import { useDrawer } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

export type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>;
export type Item = {
  id: number,
  imageUrl: string;
  price: number,
  quantity: number,
  name: string
}


type ShopContextValues = {
  onAddCart: (product: Item) => void;
  onDeleteCart: (product: Item) => void;
  onDumpCart: () => void;
  onUpdateQuantity: (product: Item) => void;
  open: boolean,
  setOpen: (open: boolean) => void;
  cart: {
    products: Item[];
    total: number;
  },
}

export const ShopContext = React.createContext({} as ShopContextValues);
export const useShop = () => React.useContext(ShopContext);

const ShopProvider = ({ children }: PropsWithChildren) => {

  const [cart, setCart] = React.useState<ShopContextValues['cart']>(() => {
    const cartLs = localStorage.getItem("cart");
    if (!cartLs) {
      return { products: [], total: 0 }
    }
    return JSON.parse(cartLs);
  });

  const { open, setOpen } = useDrawer();

  const onAddCart = (item: Item) => {
    const itemIndex = cart.products.findIndex(p => item.id === p.id);
    if (itemIndex >= 0) {
      setCart({
        ...cart,
        products: cart.products.map((p, idx) => {
          if (itemIndex === idx) {
            return {
              ...p,
              quantity: item.quantity + p.quantity
            }
          }
          return p
        })
      });
      return;
    }

    setCart({
      ...cart, products: [...cart.products, item]
    });
  }

  const onUpdateQuantity = (item: Item) => {
    const products = cart.products.map(product => {
      if (product.id === item.id) {
        return {
          ...item
        }
      }
      return product;
    });
    setCart({
      ...cart,
      products,
    })
  }

  const onDeleteCart = (item: Item) =>
    setCart({
      ...cart,
      products: cart.products.filter(p => p.id !== item.id)
    });

  const onDumpCart = () =>
    setCart({ products: [], total: 0 });


  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    if (cart.products.length !== 0)
      setCart({
        ...cart,
        total: cart.products.reduce((prev, curr) => {
          return (curr.price * curr.quantity) + prev
        }, 0)
      });

  }, [cart.products]);

  return (
    <ShopContext.Provider value={{
      cart,
      open,
      setOpen,
      onAddCart,
      onDumpCart,
      onUpdateQuantity,
      onDeleteCart
    }}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopProvider;
