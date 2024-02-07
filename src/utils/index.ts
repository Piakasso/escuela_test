export function getRandomColor() {
  const color = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)},0.8)`;
  return color;
}

export const fetchTranslate = async (
  word: string,
  source: string,
  target: string
) => {
  const url =
    process.env.REACT_APP_TRANSLATE_URL ||
    "https://deep-translate1.p.rapidapi.com/language/translate/v2";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.REACT_APP_TRANSLATE_API_KEY || "",
      "X-RapidAPI-Host": process.env.REACT_APP_TRANSLATE_HOST || "",
    },
    body: JSON.stringify({ q: word, source, target }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result.data.translations.translatedText;
  } catch (error) {
    console.error(error);
  }
};
