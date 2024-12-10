import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'blog',
    data: { pageTitle: 'blogApp.blogBlog.home.title' },
    loadChildren: () => import('./blog/blog/blog.routes'),
  },
  {
    path: 'post',
    data: { pageTitle: 'blogApp.blogPost.home.title' },
    loadChildren: () => import('./blog/post/post.routes'),
  },
  {
    path: 'tag',
    data: { pageTitle: 'blogApp.blogTag.home.title' },
    loadChildren: () => import('./blog/tag/tag.routes'),
  },
  {
    path: 'taj-user',
    data: { pageTitle: 'blogApp.blogTajUser.home.title' },
    loadChildren: () => import('./blog/taj-user/taj-user.routes'),
  },
  {
    path: 'saathratri-entity',
    data: { pageTitle: 'blogApp.blogSaathratriEntity.home.title' },
    loadChildren: () => import('./blog/saathratri-entity/saathratri-entity.routes'),
  },
  {
    path: 'saathratri-entity-2',
    data: { pageTitle: 'blogApp.blogSaathratriEntity2.home.title' },
    loadChildren: () => import('./blog/saathratri-entity-2/saathratri-entity-2.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
