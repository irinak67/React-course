import { useContext } from 'react';
import { createContext } from 'react';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
}

interface CartContextType {
    isOpen: boolean;
    items: CartItem[];
    open: () => void;
    close: () => void;
    toggle: () => void;
    addItem: (product: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
