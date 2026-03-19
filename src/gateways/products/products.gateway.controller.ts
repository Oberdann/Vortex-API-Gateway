import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UpdateProductDto } from './dtos/input/update-product-dto';
import { CreateProductDto } from './dtos/input/create-product-dto';
import { AddCategoriesToProductDto } from './dtos/input/add-categories-to-product';
import { RemoveCategoriesFromProductDto } from './dtos/input/remove-categorires-from-product';

@Controller('products')
export class ProductsGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getProducts() {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.PRODUCTS_SERVICE_URL}/products`),
    );
    return response.data;
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.PRODUCTS_SERVICE_URL}/products/${id}`,
      ),
    );
    return response.data;
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
}
