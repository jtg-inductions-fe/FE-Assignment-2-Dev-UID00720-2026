import { Component ,OnInit ,OnDestroy} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { AuthService } from '@/services/auth/auth.service';
import { Subscription } from 'rxjs';

interface SidenavNode {
  name: string;
  link?: string;
  icon?: string;
  role: string[];
  children?: SidenavNode[];
}

const TREE_DATA: SidenavNode[] = [
  {
    name: 'Overview',
    icon: 'pie_chart',
    link: '/dashboard',
    role: ['admin','restaurant-owner'],
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
    role: ['admin','restaurant-owner'],
  },
  {
    name: 'Access',
    icon: 'lock',
    link: '/access',
    role: ['admin','restaurant-owner'],
    children: [
      {
        name: 'User data',
        icon: 'lock',
        link: '/users-data',
        role: ['admin','restaurant-owner'],
      },
    ],
  }
];

const COMMON_TREE_DATA: SidenavNode[] = [
  {
    name: 'My Profile',
    icon:'assignment',
    link: '/profile',
    role: ['admin','restaurant-owner'],
  },
  {
    name: 'My Gallery',
    icon:'photo_library',
    link: '/gallery',
    role: ['admin','restaurant-owner'],
  },
  {
    name: 'Help',
    icon: 'support',
    link: '/help',
    role: ['admin','restaurant-owner'],
  }
];

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy{
  private authSubscription!: Subscription;
  treeControl = new NestedTreeControl<SidenavNode>(node => node.children);
  commonDataTreeControl = new NestedTreeControl<SidenavNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<SidenavNode>();
  commonData = new MatTreeNestedDataSource<SidenavNode>();

  constructor(private authService: AuthService,) {
    this.dataSource.data = TREE_DATA;
    this.commonData.data = COMMON_TREE_DATA;
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe((loggedInDeatils)=>{
    let userRole = '';
    if(loggedInDeatils.role) userRole = loggedInDeatils.role;
    const filteredData = this.filterNodes(TREE_DATA, userRole);
    this.dataSource.data = filteredData;
    })
  }
  filterNodes(nodes: SidenavNode[], role: string): any[] {
    return nodes.filter(node => {
      const isAllowed = node.role.includes(role);
      if (node.children) {
        node.children = this.filterNodes(node.children, role);
      }
      return isAllowed && (node.children?.length || true); // Keep if allowed and (has children or is leaf)
    });
  }

  hasChild = (_: number, node: SidenavNode) => !!node.children && node.children.length > 0;

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}