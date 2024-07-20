import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IProduct, NewProduct } from '../product.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProduct for edit and NewProductFormGroupInput for create.
 */
type ProductFormGroupInput = IProduct | PartialWithRequiredKeyOf<NewProduct>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IProduct | NewProduct> = Omit<T, 'addedDateTime'> & {
  addedDateTime?: string | null;
};

type ProductFormRawValue = FormValueOf<IProduct>;

type NewProductFormRawValue = FormValueOf<NewProduct>;

type ProductFormDefaults = Pick<NewProduct, 'id' | 'addedDateTime'>;

type ProductFormGroupContent = {
  id: FormControl<ProductFormRawValue['id'] | NewProduct['id']>;
  title: FormControl<ProductFormRawValue['title']>;
  price: FormControl<ProductFormRawValue['price']>;
  image: FormControl<ProductFormRawValue['image']>;
  imageContentType: FormControl<ProductFormRawValue['imageContentType']>;
  addedDate: FormControl<ProductFormRawValue['addedDate']>;
  addedDateTime: FormControl<ProductFormRawValue['addedDateTime']>;
};

export type ProductFormGroup = FormGroup<ProductFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductFormService {
  createProductFormGroup(product: ProductFormGroupInput = { id: '' }): ProductFormGroup {
    const productRawValue = this.convertProductToProductRawValue({
      ...this.getFormDefaults(),
      ...product,
    });
    return new FormGroup<ProductFormGroupContent>({
      id: new FormControl(
        { value: productRawValue.id, disabled: productRawValue.id !== '' },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(productRawValue.title, {
        validators: [Validators.required],
      }),
      price: new FormControl(productRawValue.price, {
        validators: [Validators.required, Validators.min(0)],
      }),
      image: new FormControl(productRawValue.image),
      imageContentType: new FormControl(productRawValue.imageContentType),
      addedDate: new FormControl(productRawValue.addedDate, {
        validators: [Validators.required],
      }),
      addedDateTime: new FormControl(productRawValue.addedDateTime),
    });
  }

  getProduct(form: ProductFormGroup): IProduct | NewProduct {
    return this.convertProductRawValueToProduct(form.getRawValue() as ProductFormRawValue | NewProductFormRawValue);
  }

  resetForm(form: ProductFormGroup, product: ProductFormGroupInput): void {
    const productRawValue = this.convertProductToProductRawValue({ ...this.getFormDefaults(), ...product });
    form.reset(
      {
        ...productRawValue,
        id: { value: productRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProductFormDefaults {
    const currentTime = dayjs();

    return {
      id: '',
      addedDateTime: currentTime,
    };
  }

  private convertProductRawValueToProduct(rawProduct: ProductFormRawValue | NewProductFormRawValue): IProduct | NewProduct {
    return {
      ...rawProduct,
      addedDateTime: dayjs(rawProduct.addedDateTime, DATE_TIME_FORMAT),
    };
  }

  private convertProductToProductRawValue(
    product: IProduct | (Partial<NewProduct> & ProductFormDefaults),
  ): ProductFormRawValue | PartialWithRequiredKeyOf<NewProductFormRawValue> {
    return {
      ...product,
      addedDateTime: product.addedDateTime ? product.addedDateTime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
