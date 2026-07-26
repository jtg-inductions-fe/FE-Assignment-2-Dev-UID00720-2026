import { UserRole } from '@core/models/user.model';
import { SidenavNode } from './side-nav.types';

export const TREE_DATA: SidenavNode[] = [
  {
    name: 'Overview',
    icon: 'pie_chart',
    link: '/dashboard',
    role: [UserRole.Admin, UserRole.RestaurantOwner],
  },
  {
    name: 'Restaurant',
    icon: 'restaurant',
    link: '/restaurant',
    role: [UserRole.Admin],
  },
  {
    name: 'Menu',
    icon: 'local_dining',
    link: '/menu',
    role: [UserRole.RestaurantOwner],
  },
  {
    name: 'Billing history',
    icon: 'description',
    link: '/billing-history',
    role: [UserRole.RestaurantOwner],
  },
  {
    name: 'Inventory',
    icon: 'shopping_bag',
    link: '/inventory',
    role: [UserRole.RestaurantOwner],
  },
  {
    name: 'Messages',
    icon: 'inbox',
    link: '/messages',
    role: [UserRole.Admin, UserRole.RestaurantOwner],
  },
  {
    name: 'Access',
    icon: 'lock',
    link: '/access',
    role: [UserRole.Admin, UserRole.RestaurantOwner],
    children: [
      {
        name: 'User data',
        icon: 'lock',
        link: '/users-data',
        role: [UserRole.Admin, UserRole.RestaurantOwner],
      },
    ],
  },
];

export const COMMON_TREE_DATA: SidenavNode[] = [
  {
    name: 'My Profile',
    icon: 'assignment',
    link: '/profile',
    role: [UserRole.Admin, UserRole.RestaurantOwner],
  },
  {
    name: 'My Gallery',
    icon: 'photo_library',
    link: '/gallery',
    role: [UserRole.Admin, UserRole.RestaurantOwner],
  },
  {
    name: 'Help',
    icon: 'support',
    link: '/help',
    role: [UserRole.Admin, UserRole.RestaurantOwner],
  },
];
