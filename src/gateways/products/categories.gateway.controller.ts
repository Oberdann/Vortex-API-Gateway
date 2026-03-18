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
import { UpdateCategoryDto } from './dtos/input/update-category-dto';
import { CreateCategoryDto } from './dtos/input/create-category-dto';

@Controller('categories')
export class CategoriesGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getCategories() {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.PRODUCTS_SERVICE_URL}/categories`),
    );
    return response.data;
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.PRODUCTS_SERVICE_URL}/categories/${id}`,
      ),
    );
    return response.data;
  }

  @Get(':id/products')
  async getProductsByCategory(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.PRODUCTS_SERVICE_URL}/categories/${id}/products`,
      ),
    );
    return response.data;
  }

  @Post()
  async createCategory(@Body() createDto: CreateCategoryDto) {
    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.PRODUCTS_SERVICE_URL}/categories`,
        createDto,
      ),
    );
    return response.data;
  }

  @Put(':id')
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

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.httpService.delete(
        `${process.env.PRODUCTS_SERVICE_URL}/categories/${id}`,
      ),
    );
    return response.data;
  }
}
