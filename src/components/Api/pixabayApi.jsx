import axios from "axios";
export async function pixabayApi (input, page) {
    try {

        const response = await axios.get(
          `https://pixabay.com/api/?q=${input}&page=1&key=24796012-24b5258be9d2a1f3ae4215f6c&image_type=photo&orientation=horizontal&per_page=20&page=${page}`
        );console.log(page)
        return response.data;
    
      } catch (error) {
        console.error(error);
    
      }
    }
