/**
 * IMPORTS
 */
import axios from "axios";

const handleGetTherapist = async () => {
    try {
      const request = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto")
      return request.data;
    } catch (error) {
      return error;
    }
  };

  /**
 * EXPORTS
 */
export { handleGetTherapist };