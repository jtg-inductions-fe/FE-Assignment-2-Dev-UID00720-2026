import { SidenavNode } from './side-nav.types';

export const TREE_DATA: SidenavNode[] = [
  {
    name: 'Overview',
    icon: 'pie_chart',
    link: '/dashboard',
    role: ['admin', 'restaurant-owner'],
  },
  {
    name: 'Restaurant',
    icon: 'restaurant',
    link: '/restaurant',
    role: ['admin'],
  },
  {
    name: 'Menu',
    icon: 'local_dining',
    link: '/menu',
    role: ['restaurant-owner'],
  },
  {
    name: 'Billing history',
    icon: 'description',
    link: '/billing-history',
    role: ['restaurant-owner'],
  },
  {
    name: 'Inventory',
    icon: 'shopping_bag',
    link: '/inventory',
    role: ['restaurant-owner'],
  },
  {
    name: 'Messages',
    icon: 'inbox',
    link: '/messages',
    role: ['admin', 'restaurant-owner'],
  },
  {
    name: 'Access',
    icon: 'lock',
    link: '/access',
    role: ['admin', 'restaurant-owner'],
    children: [
      {
        name: 'User data',
        icon: 'lock',
        link: '/users-data',
        role: ['admin', 'restaurant-owner'],
      },
    ],
  },
];

export const COMMON_TREE_DATA: SidenavNode[] = [
  {
    name: 'My Profile',
    icon: 'assignment',
    link: '/profile',
    role: ['admin', 'restaurant-owner'],
  },
  {
    name: 'My Gallery',
    icon: 'photo_library',
    link: '/gallery',
    role: ['admin', 'restaurant-owner'],
  },
  {
    name: 'Help',
    icon: 'support',
    link: '/help',
    role: ['admin', 'restaurant-owner'],
  },
];
