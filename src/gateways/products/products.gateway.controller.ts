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
import { UpdateCategoryDto } from './dtos/input/update-category-dto';
import { CreateCategoryDto } from './dtos/input/create-category-dto';

@Controller('products')
export class ProductsGatewayController {
  constructor(private readonly httpService: HttpService) {}

  // ---------------- Products ----------------
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

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.delete(
        `${process.env.PRODUCTS_SERVICE_URL}/products/${id}`,
      ),
    );
    return response.data;
  }

  // ---------------- Categories ----------------
  @Get('categories')
  async getCategories() {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.PRODUCTS_SERVICE_URL}/categories`),
    );
    return response.data;
  }

  @Get('categories/:id')
  async getCategoryById(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.PRODUCTS_SERVICE_URL}/categories/${id}`,
      ),
    );
    return response.data;
  }

  @Get('categories/:id/products')
  async getProductsByCategory(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.PRODUCTS_SERVICE_URL}/categories/${id}/products`,
      ),
    );
    return response.data;
  }

  @Post('categories')
  async createCategory(@Body() createDto: CreateCategoryDto) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.PRODUCTS_SERVICE_URL}/categories`,
        createDto,
      ),
    );
    return response.data;
  }

  @Put('categories/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateDto: UpdateCategoryDto,
  ) {
    const response = await firstValueFrom(
      this.httpService.put(
        `${process.env.PRODUCTS_SERVICE_URL}/categories/${id}`,
        updateDto,
      ),
    );
    return response.data;
  }

  @Delete('categories/:id')
  async deleteCategory(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.delete(
        `${process.env.PRODUCTS_SERVICE_URL}/categories/${id}`,
      ),
    );
    return response.data;
  }
}
