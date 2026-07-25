import { Component, OnInit, OnDestroy } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { Subscription } from 'rxjs';

import { AuthService } from '@core/services/auth/auth.service';
import { COMMON_TREE_DATA, TREE_DATA } from './side-nav.constants';
import { SidenavNode } from './side-nav.types';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
  treeControl = new NestedTreeControl<SidenavNode>(node => node.children);
  commonDataTreeControl = new NestedTreeControl<SidenavNode>(
    node => node.children
  );
  dataSource = new MatTreeNestedDataSource<SidenavNode>();
  commonData = new MatTreeNestedDataSource<SidenavNode>();

  private authSubscription!: Subscription;

  constructor(private authService: AuthService) {
    this.dataSource.data = TREE_DATA;
    this.commonData.data = COMMON_TREE_DATA;
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      loggedInDeatils => {
        let userRole = '';
        if (loggedInDeatils.role) {
          userRole = loggedInDeatils.role;
        }
        const filteredData = this.filterNodes(TREE_DATA, userRole);
        this.dataSource.data = filteredData;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  filterNodes(nodes: SidenavNode[], role: string): SidenavNode[] {
    return nodes.filter(node => {
      const isAllowed = node.role.includes(role);
      if (node.children) {
        node.children = this.filterNodes(node.children, role);
      }
      return isAllowed;
    });
  }

  hasChild = (_: number, node: SidenavNode) =>
    !!node.children && node.children.length > 0;
}
