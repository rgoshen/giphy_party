const $searchInput = $("#search");
const $gifGallery = $(".gif-gallery");
const $status = $(".status");

function renderGallery(res) {
  let resultsLength = res.data.length;
  let altText = $searchInput.val();

  if (resultsLength) {
    let randIndex = Math.floor(Math.random() * resultsLength);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randIndex].images.original.url,
      class: "w-100 img-fluid",
      alt: `${altText} gify`,
    });
    $newCol.append($newGif);
    $gifGallery.append($newCol);
  }
}

async function getGif() {
  let searchTerm = $searchInput.val();
  const urlApi = "http://api.giphy.com/v1/gifs/search";
  const apiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

  const res = await axios.get(urlApi, {
    params: { q: searchTerm, api_key: apiKey },
  });

  renderGallery(res.data);
  clearForm();
}

function inputError() {
  $status.addClass("error");
  $status.text("ERROR! Please enter in a search term.");
  $searchInput.css("border", "2px solid red");
}

function clearForm() {
  $searchInput.val("");
}

// for header
const letters = document.querySelectorAll('.letter');
const intervalId = setInterval(() => {
  for (let letter of letters) {
    letter.style.color = randomHsl();
  }
}, 500);

function randomHsl() {
  const randHue = Math.floor(Math.random() * 360);
  return `hsl(${randHue}, 100%, 50%)`;
}

// events
$("#submit").on("click", (e) => {
  e.preventDefault();
  if (!$searchInput.val()) {
    inputError();
  } else {
    getGif();
  }
});

$("#remove").on("click", () => $gifGallery.empty());

$("#search").on("click", () => {
  $status.text("");
  $status.removeClass("error");
  $searchInput.css("border", "1px solid #ced4da");
});
