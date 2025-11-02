// Configuration file for backend integration
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "",
    timeout: 10000,
  },

  // Payment configuration
  payment: {
    promptPayId: "0123456789", // Replace with actual PromptPay ID
    promptPayName: "Dried Fruit Store",
  },

  // App configuration
  app: {
    name: "Dried Fruit Store",
    currency: "THB",
    currencySymbol: "฿",
  },
} as const
