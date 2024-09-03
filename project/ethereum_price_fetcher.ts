import axios from "axios";
import { Price } from "./Models/schema";

const fetchAndStoreEthPrice = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr"
    );

    const ethPriceInInr = response.data.ethereum.inr;
    const newPrice = new Price({ price: ethPriceInInr });
    await newPrice.save();

    console.log(`Ethereum price stored: ₹${ethPriceInInr}`);
  } catch (err) {
    console.error("Error fetching Ethereum price:", err);
  }
};

const startPriceFetchingService = () => {
  fetchAndStoreEthPrice();
  setInterval(fetchAndStoreEthPrice, 10 * 60 * 1000);
};

export default startPriceFetchingService;
