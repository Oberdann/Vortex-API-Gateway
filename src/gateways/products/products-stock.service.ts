import { BadGatewayException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { StockAvailabilityResponseDto } from './dtos/output/stock-availability-response.dto';

const INTERNAL_REQUEST_TIMEOUT_MS = 3000;

@Injectable()
export class ProductsStockService {
  constructor(private readonly httpService: HttpService) {}

  async getStockByProductIds(productIds: string[]) {
    const stockServiceUrl = process.env.STOCK_SERVICE_URL;
    if (!stockServiceUrl) {
      throw new BadGatewayException(
        'A URL do Stock Service nao esta configurada.',
      );
    }

    let stockServiceResponse;

    try {
      stockServiceResponse = await firstValueFrom(
        this.httpService.post(
          `${stockServiceUrl}/stock/batch`,
          { productIds },
          { timeout: INTERNAL_REQUEST_TIMEOUT_MS },
        ),
      );
    } catch {
      throw new BadGatewayException(
        'Nao foi possivel consultar a disponibilidade no Stock Service.',
      );
    }

    const stocks = stockServiceResponse.data.data;

    const stocksByProductId = new Map<string, StockAvailabilityResponseDto>(
      stocks.map((stock) => [stock.productId, stock] as const),
    );

    const hasMissingStock = productIds.some(
      (productId) => !stocksByProductId.has(productId),
    );
    if (hasMissingStock) {
      throw new BadGatewayException(
        'O Stock Service nao retornou disponibilidade para todos os produtos.',
      );
    }

    const response = stocksByProductId;

    return response;
  }

  getStockForProduct(
    productId: string,
    stocksByProductId: Map<string, StockAvailabilityResponseDto>,
  ): Omit<StockAvailabilityResponseDto, 'productId'> {
    const stock = stocksByProductId.get(productId);

    if (!stock) {
      throw new BadGatewayException(
        'O Stock Service nao retornou disponibilidade para este produto.',
      );
    }

    const response = {
      available: stock.available,
      inStock: stock.inStock,
    };

    return response;
  }
}
