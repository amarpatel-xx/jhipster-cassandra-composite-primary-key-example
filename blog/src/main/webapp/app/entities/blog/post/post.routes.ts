import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { PostComponent } from './list/post.component';
import { PostDetailComponent } from './detail/post-detail.component';
import { PostUpdateComponent } from './update/post-update.component';
import PostResolve from './route/post-routing-resolve.service';

const postRoute: Routes = [
  {
    path: '',
    component: PostComponent,
    data: {
      defaultSort: 'createdDate,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':createdDate/:addedDateTime/:postId/view',
    component: PostDetailComponent,
    resolve: {
      post: PostResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PostUpdateComponent,
    resolve: {
      post: PostResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':createdDate/:addedDateTime/:postId/edit',
    component: PostUpdateComponent,
    resolve: {
      post: PostResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default postRoute;
