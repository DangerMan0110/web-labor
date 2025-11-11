export async function fetchQuestions(amount=5, difficulty='easy'){
  const url = `https://opentdb.com/api.php?amount=${amount}&type=multiple&difficulty=${difficulty}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}
