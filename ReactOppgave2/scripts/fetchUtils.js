export const fetchApi = async (url, options) => {
  const response = await fetch(url, options);
  const result = await response.json();
  return result;
};

export const dataBaseFilePath = "../Data/CardNameDataBase.json";

export const url = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards";

export const options = {
  method: "GET",
  headers: {
    "X-RapidApi-Key": "15e85ca081mshec2069e3d92a3c8p16b9d5jsnf90ba7ccc9c8",
    "X-RapidApi-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
  },
};
