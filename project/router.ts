import { Router } from "express";
import {
  get_etherium_prices,
  get_normal_transactions,
  get_total_user_expenses,
} from "./Controller/transaction";

const router = Router();

router.get("/getNormalTransactions/:address", get_normal_transactions);
router.get("/getUserExpenses/:address", get_total_user_expenses);
router.get("/getEthereumPrices", get_etherium_prices);

export default router;
