import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBlog, IBlogId, NewBlog } from '../blog.model';
export type PartialUpdateBlog = Partial<IBlog> & Pick<IBlog, 'compositeId'>;

export type EntityResponseType = HttpResponse<IBlog>;
export type EntityArrayResponseType = HttpResponse<IBlog[]>;

@Injectable({ providedIn: 'root' })
export class BlogService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/blogs', 'blog');

  create(blog: NewBlog): Observable<EntityResponseType> {
    return this.http.post<IBlog>(this.resourceUrl, blog, { observe: 'response' });
  }

  update(blog: IBlog): Observable<EntityResponseType> {
    return this.http.put<IBlog>(`${this.resourceUrl}/${blog.compositeId.category}/${blog.compositeId.blogId}`, blog, {
      observe: 'response',
    });
  }

  partialUpdate(blog: PartialUpdateBlog): Observable<EntityResponseType> {
    return this.http.patch<IBlog>(`${this.resourceUrl}/${blog.compositeId.category}/${blog.compositeId.blogId}`, blog, {
      observe: 'response',
    });
  }

  find(category: string, blogId: string): Observable<EntityResponseType> {
    const data = { category, blogId };
    return this.http.get<IBlog>(`${this.resourceUrl}/get`, { params: data, observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBlog[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(blog: IBlog): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${blog.compositeId.category}/${blog.compositeId.blogId}`, { observe: 'response' });
  }

  getBlogIdentifier(blog: Pick<IBlog, 'compositeId'>): IBlogId {
    return blog.compositeId;
  }
  compareBlog(o1: Pick<IBlog, 'compositeId'> | null, o2: Pick<IBlog, 'compositeId'> | null): boolean {
    return o1 && o2 ? this.getBlogIdentifier(o1) === this.getBlogIdentifier(o2) : o1 === o2;
  }
  addBlogToCollectionIfMissing<Type extends Pick<IBlog, 'compositeId'>>(
    blogCollection: Type[],
    ...blogsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const blogs: Type[] = blogsToCheck.filter(isPresent);
    if (blogs.length > 0) {
      const blogCollectionIdentifiers = blogCollection.map(blogItem => this.getBlogIdentifier(blogItem));
      const blogsToAdd = blogs.filter(blogItem => {
        const blogIdentifier = this.getBlogIdentifier(blogItem);
        if (blogCollectionIdentifiers.includes(blogIdentifier)) {
          return false;
        }
        blogCollectionIdentifiers.push(blogIdentifier);
        return true;
      });
      return [...blogsToAdd, ...blogCollection];
    }
    return blogCollection;
  }
}
