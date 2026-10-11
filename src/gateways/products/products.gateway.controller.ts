import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AddCategoriesToProductDto } from './dtos/input/add-categories-to-product';
import { CreateProductDto } from './dtos/input/create-product-dto';
import { RemoveCategoriesFromProductDto } from './dtos/input/remove-categorires-from-product';
import { UpdateProductDto } from './dtos/input/update-product-dto';
import { ProductResponseDto } from './dtos/output/product-response.dto';
import { ProductWithStockResponseDto } from './dtos/output/product-with-stock-response.dto';
import { ProductsStockService } from './products-stock.service';

const INTERNAL_REQUEST_TIMEOUT_MS = 3000;

@Controller('products')
export class ProductsGatewayController {
  constructor(
    private readonly httpService: HttpService,
    private readonly productsStockService: ProductsStockService,
  ) {}

  @Get()
  async getProducts() {
    const productsServiceResponse = await firstValueFrom(
      this.httpService.get(`${process.env.PRODUCTS_SERVICE_URL}/products`, {
        timeout: INTERNAL_REQUEST_TIMEOUT_MS,
      }),
    );

    const response = await this.addStockToResponse(productsServiceResponse);

    return response;
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const productServiceResponse = await firstValueFrom(
      this.httpService.get(
        `${process.env.PRODUCTS_SERVICE_URL}/products/${id}`,
      ),
    );
    const response = await this.addStockToResponse(productServiceResponse);

    return response;
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.PRODUCTS_SERVICE_URL}/products`,
        body,
      ),
    );

    return response.data;
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    const response = await firstValueFrom(
      this.httpService.put(
        `${process.env.PRODUCTS_SERVICE_URL}/products/${id}`,
        body,
      ),
    );

    return response.data;
  }

  @Put(':id/categories/add')
  async addCategoriesToProduct(
    @Param('id') id: string,
    @Body() body: AddCategoriesToProductDto,
  ) {
    const response = await firstValueFrom(
      this.httpService.put(
        `${process.env.PRODUCTS_SERVICE_URL}/products/${id}/categories/add`,
        body,
      ),
    );

    return response.data;
  }

  @Put(':id/categories/remove')
  async removeCategoriesFromProduct(
    @Param('id') id: string,
    @Body() body: RemoveCategoriesFromProductDto,
  ) {
    const response = await firstValueFrom(
      this.httpService.put(
        `${process.env.PRODUCTS_SERVICE_URL}/products/${id}/categories/remove`,
        body,
      ),
    );

    return response.data;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.delete(
        `${process.env.PRODUCTS_SERVICE_URL}/products/${id}`,
      ),
    );

    return response.data;
  }

  private async addStockToResponse(productServiceResponse: {
    data: {
      data: ProductResponseDto | { products: ProductResponseDto[] };
      [key: string]: unknown;
    };
  }) {
    const productData = productServiceResponse.data.data;

    const isProductList = 'products' in productData;

    const products = isProductList ? productData.products : [productData];

    if (products.length === 0) {
      const response = {
        ...productServiceResponse.data,
        data: { ...productData, products: [] },
      };

      return response;
    }

    const productIds = products.map((product) => product.id);

    const stocksByProductId =
      await this.productsStockService.getStockByProductIds(productIds);

    const productsWithStock: ProductWithStockResponseDto[] = products.map(
      (product) => ({
        ...product,
        stock: this.productsStockService.getStockForProduct(
          product.id,
          stocksByProductId,
        ),
      }),
    );

    const data = isProductList
      ? { ...productData, products: productsWithStock }
      : productsWithStock[0];

    const response = {
      ...productServiceResponse.data,
      data,
    };

    return response;
  }
}
