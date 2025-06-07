import axios from "axios";

export const fetchPopularBooksFromAPI = async (page: number) => {

  try {
    const response = await axios.get(
        "https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/popularBooks",
        {
          params: {
            pagenum: page,
          },

        }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching popular books:", error);
    return [];
  }
};

export const fetchBookImageFromAPI = async (bookid: string) => {
  try {
    const response = await axios.get(
      `https://intelligent-shockley-8ynjnlm8e.liara.run/api/book/image/${bookid}`,
      { responseType: 'blob' }
    );
    if (response.status === 200) {
      return URL.createObjectURL(response.data);
    }
  } catch (error) {
    console.error("Error fetching book image:", error);
  }
  return null;
};
