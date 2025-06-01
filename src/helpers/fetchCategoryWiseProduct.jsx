import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
  try {
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
      method: SummaryApi.categoryWiseProduct.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const dataResponse = await response.json();
    return dataResponse;
  } catch (error) {
    console.error("Failed to fetch category-wise product:", error);
    return { success: false, message: error.message };
  }
};

export default fetchCategoryWiseProduct;
