import { ApiProperty } from "@nestjs/swagger";

export class TopUpBalanceDto {
  @ApiProperty({
    type: String,
    example: "547703d3-fe3e-40aa-9e8e-9cb9a9291230",
  })
  user_id: string;

  @ApiProperty({
    type: Number,
    example: 100
  })
  amount: number;
}
