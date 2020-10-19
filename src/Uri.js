class Uri {
  constructor() {
    this.url = "";
  }

  get urlCreator() {
    var row = document.getElementById("quiz-container");
    row.innerHTML = "";
    let category = document.getElementById("category");
    let difficulty = document.getElementById("difficulty");
    let type = document.getElementById("type");
    console.log(category.value);
    console.log(difficulty.value);
    console.log(type.value);
    if (
      category.value == "any" &&
      difficulty.value == "any" &&
      type.value == "any"
    ) {
      this.url = "https://opentdb.com/api.php?amount=10";
    } else if (category.value == "any" && difficulty.value == "any") {
      this.url = `https://opentdb.com/api.php?amount=10&type=${type.value}`;
    } else if (difficulty.value == "any" && type.value == "any") {
      this.url = `https://opentdb.com/api.php?amount=10&category=${category.value}`;
    } else if (category.value == "any" && type.value == "any") {
      this.url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty.value}`;
    } else if (category.value == "any") {
      this.url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty.value}&type=${type.value}`;
    } else if (difficulty.value == "any") {
      this.url = `https://opentdb.com/api.php?amount=10&category=${category.value}&type=${type.value}`;
    } else if (type.value == "any") {
      this.url = `https://opentdb.com/api.php?amount=10&category=${category.value}&difficulty=${difficulty.value}`;
    } else {
      this.url = `https://opentdb.com/api.php?amount=10&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`;
    }
    return this.url;
  }
}

export default Uri;
