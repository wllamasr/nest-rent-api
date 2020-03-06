import { HttpException, HttpStatus } from "@nestjs/common";

export class OutOfStockException extends HttpException {
    constructor() {
        super(
            { error: 'Item is not available due to out of stock' },
            HttpStatus.BAD_REQUEST
        )
    }
}