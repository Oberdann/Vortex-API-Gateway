import { ProductResponseDto } from './product-response.dto';
import { StockAvailabilityResponseDto } from './stock-availability-response.dto';

export class ProductWithStockResponseDto extends ProductResponseDto {
  stock: Omit<StockAvailabilityResponseDto, 'productId'>;
}
