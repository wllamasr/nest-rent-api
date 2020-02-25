import { Module } from '@nestjs/common';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rent } from './rent.model';

@Module({
  imports: [SequelizeModule.forFeature([Rent])],
  controllers: [RentController],
  providers: [RentService]
})
export class RentModule { }
