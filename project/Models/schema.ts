import mongoose, { Schema, Document, Types } from "mongoose";

interface ITransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
}

interface IAddress extends Document {
  address: string;
  transactions: ITransaction[];
}

interface IPrice extends Document {
  price: number;
  timestamp: Date;
}

const PriceSchema: Schema = new Schema({
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const TransactionSchema: Schema = new Schema({
  blockNumber: { type: String },
  blockHash: { type: String },
  timeStamp: { type: String },
  hash: { type: String },
  nonce: { type: String },
  transactionIndex: { type: String },
  from: { type: String },
  to: { type: String },
  value: { type: String },
  gas: { type: String },
  gasPrice: { type: String },
  input: { type: String },
  methodId: { type: String },
  functionName: { type: String },
  contractAddress: { type: String },
  cumulativeGasUsed: { type: String },
  txreceipt_status: { type: String },
  gasUsed: { type: String },
  confirmations: { type: String },
  isError: { type: String },
});

const AddressSchema: Schema = new Schema({
  address: { type: String, required: true },
  transactions: { type: [TransactionSchema], required: false },
});

const Address = mongoose.model<IAddress>("Address", AddressSchema);
const Price = mongoose.model<IPrice>("Price", PriceSchema);

export { Address, Price };
