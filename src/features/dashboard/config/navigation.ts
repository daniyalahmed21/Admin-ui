import { Gift, HelpCircle, Home, Package, Settings, ShoppingBag, Store, Users } from "lucide-react";

export const MENU_ITEMS = [
    { label: 'Home', icon: Home, path: '/dashboard' },
    { label: 'Orders', icon: ShoppingBag, path: '/dashboard/orders' },
    { label: 'Products', icon: Package, path: '/dashboard/products' },
    { label: 'Users', icon: Users, path: '/dashboard/users' },
    { label: 'Restaurants', icon: Store, path: '/dashboard/restaurants' },
    { label: 'Promo', icon: Gift, path: '/dashboard/promo' },
];

export const BOTTOM_ITEMS = [
    { label: 'Settings', icon: Settings, path: '/settings' },
    { label: 'Help', icon: HelpCircle, path: '/help' },
];
