import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPost, NewPost } from '../post.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { compositeId: { createdDate: unknown; addedDateTime: unknown; postId: unknown } }> = Partial<
  Omit<T, 'compositeId'>
> & { compositeId: T['compositeId'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPost for edit and NewPostFormGroupInput for create.
 */
type PostFormGroupInput = IPost | PartialWithRequiredKeyOf<NewPost>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPost | NewPost> = Omit<T, 'addedDateTime'> & {
  addedDateTime?: string | null;
};

type PostFormRawValue = FormValueOf<IPost>;

type NewPostFormRawValue = FormValueOf<NewPost>;

type PostFormDefaults = Pick<NewPost, 'compositeId'>;

type PostFormGroupContent = {
  compositeId: FormGroup<{
    createdDate: FormControl<PostFormRawValue['compositeId']['createdDate']>;
    addedDateTime: FormControl<PostFormRawValue['compositeId']['addedDateTime']>;
    postId: FormControl<PostFormRawValue['compositeId']['postId']>;
  }>;
  title: FormControl<PostFormRawValue['title']>;
  content: FormControl<PostFormRawValue['content']>;
};

export type PostFormGroup = FormGroup<PostFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PostFormService {
  createPostFormGroup(post: PostFormGroupInput = { compositeId: { createdDate: null, addedDateTime: null, postId: null } }): PostFormGroup {
    const postRawValue = this.convertPostToPostRawValue({
      ...this.getFormDefaults(),
      ...post,
    });
    return new FormGroup<PostFormGroupContent>({
      compositeId: new FormGroup({
        createdDate: new FormControl(
          { value: postRawValue.compositeId.createdDate, disabled: postRawValue.compositeId.createdDate !== null },
          {
            nonNullable: true,
            validators: [Validators.required],
          },
        ),
        addedDateTime: new FormControl(
          { value: postRawValue.compositeId.addedDateTime, disabled: postRawValue.compositeId.addedDateTime !== null },
          {
            nonNullable: true,
            validators: [Validators.required],
          },
        ),
        postId: new FormControl(
          { value: postRawValue.compositeId.postId, disabled: postRawValue.compositeId.postId !== null },
          {
            nonNullable: true,
            validators: [Validators.required],
          },
        ),
      }),
      title: new FormControl(postRawValue.title, {
        validators: [Validators.required],
      }),
      content: new FormControl(postRawValue.content, {
        validators: [Validators.required],
      }),
    });
  }

  getPost(form: PostFormGroup): IPost | NewPost {
    return this.convertPostRawValueToPost(form.getRawValue() as PostFormRawValue | NewPostFormRawValue);
  }

  resetForm(form: PostFormGroup, post: PostFormGroupInput): void {
    const postRawValue = this.convertPostToPostRawValue({ ...this.getFormDefaults(), ...post });
    form.reset(
      {
        ...postRawValue,
        compositeId: {
          createdDate: { value: postRawValue.compositeId.createdDate, disabled: postRawValue.compositeId.createdDate !== null },
          addedDateTime: { value: postRawValue.compositeId.addedDateTime, disabled: postRawValue.compositeId.addedDateTime !== null },
          postId: { value: postRawValue.compositeId.postId, disabled: postRawValue.compositeId.postId !== null },
        },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PostFormDefaults {
    const currentTime = dayjs();

    return {
      compositeId: {
        createdDate: null,
        addedDateTime: currentTime,
        postId: null,
      },
    };
  }

  private convertPostRawValueToPost(rawPost: PostFormRawValue | NewPostFormRawValue): IPost | NewPost {
    return {
      ...rawPost,
      compositeId: {
        ...rawPost.compositeId,
        addedDateTime: dayjs(rawPost.compositeId.addedDateTime, DATE_TIME_FORMAT),
      },
    };
  }

  private convertPostToPostRawValue(
    post: IPost | (Partial<NewPost> & PostFormDefaults),
  ): PostFormRawValue | PartialWithRequiredKeyOf<NewPostFormRawValue> {
    return {
      ...post,
      compositeId: {
        ...post.compositeId,
        addedDateTime: post.compositeId.addedDateTime ? post.compositeId.addedDateTime : null,
      },
    };
  }
}
