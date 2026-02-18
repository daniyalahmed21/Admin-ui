import { BarChart2, Gift, HelpCircle, Home, Package, Settings, ShoppingBag, Users } from "lucide-react";

export const MENU_ITEMS = [
    { label: 'Home', icon: Home, path: '/dashboard' },
    { label: 'Orders', icon: ShoppingBag, path: '/dashboard/orders' },
    { label: 'Products', icon: Package, path: '/dashboard/products' },
    { label: 'Users', icon: Users, path: '/dashboard/users' },
    { label: 'Sales', icon: BarChart2, path: '/dashboard/sales' },
    { label: 'Promo', icon: Gift, path: '/dashboard/promo' },
];

export const BOTTOM_ITEMS = [
    { label: 'Settings', icon: Settings, path: '/settings' },
    { label: 'Help', icon: HelpCircle, path: '/help' },
];
