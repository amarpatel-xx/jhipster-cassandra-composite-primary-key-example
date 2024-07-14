import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { IPost } from '../post.model';
import { PostService } from '../service/post.service';

import postResolve from './post-routing-resolve.service';

describe('Post routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: PostService;
  let resultPost: IPost | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(PostService);
    resultPost = undefined;
  });

  describe('resolve', () => {
    it('should return IPost returned by find', () => {
      // GIVEN
      service.find = jest.fn(createdDate => of(new HttpResponse({ body: { createdDate } })));
      mockActivatedRouteSnapshot.params = { createdDate: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        postResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultPost = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultPost).toEqual({ createdDate: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        postResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultPost = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPost).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IPost>({ body: null })));
      mockActivatedRouteSnapshot.params = { createdDate: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        postResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultPost = result;
          },
        });
      });

      // THEN
      expect(service.find).toHaveBeenCalledWith(123);
      expect(resultPost).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
