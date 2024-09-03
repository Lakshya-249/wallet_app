import { Request, Response } from "express";
import { Address, Price } from "../Models/schema";
import axios from "axios";
// import { loadEnvFile } from "process";
import "dotenv/config";
require("dotenv").config();
// loadEnvFile();

const api_key = process.env.SECRET_API_KEY;

const get_normal_transactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { address } = req.params;
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&offset=10&sort=asc&apikey=${api_key}`
    );
    const transactions = response.data.result;

    if (!transactions || transactions.length === 0) {
      res.status(404).json({ message: "No transactions found" });
      return;
    }

    let address_given = await Address.findOne({ address: address });
    if (!address_given) {
      address_given = new Address({
        address,
        transactions,
      });
    } else address_given.transactions = transactions;
    await address_given.save();

    res.status(200).json(transactions);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "An error occurred" });
  }
};

const get_total_user_expenses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { address } = req.params;
    const response = await Address.findOne({ address: address });
    if (!response) {
      res.status(404).json({ message: "Address not found" });
      return;
    }
    const transactions = response.transactions;
    const totalExpenses = transactions.reduce((total, tx) => {
      const gasUsed = parseFloat(tx.gasUsed || "0");
      const gasPrice = parseFloat(tx.gasPrice || "0");
      return total + (gasUsed * gasPrice) / 1e18;
    }, 0);

    const ethPriceList = await Price.findOne().sort({ timestamp: -1 });
    const currentEthPrice = ethPriceList?.price || 0;
    res.status(200).json({
      address: address,
      totalExpenses,
      currentEthPrice,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
};

const get_etherium_prices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prices = await Price.find().sort({ timestamp: -1 }).limit(10);
    res.status(200).json(prices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
};

export {
  get_normal_transactions,
  get_total_user_expenses,
  get_etherium_prices,
};
