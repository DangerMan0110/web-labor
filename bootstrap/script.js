// 3️⃣ Alert
$('#showAlert').on('click', function() {
  const alert = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      Sikeresen megjelenítettél egy alertet!
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
  $('#alertBox').html(alert);
});

// 4️⃣ Modal tartalom módosítás
$('#infoModal').on('show.bs.modal', function() {
  $('.modal-body p').text('Tartalom betöltve jQuery-ből.');
});

// 5️⃣ Form kezelése
$('#contactForm').on('submit', function(e) {
  e.preventDefault();
  const nev = $('#name').val().trim();
  if (nev) {
    $('#thanks').text(`Köszönjük, ${nev}!`);
  } else {
    $('#thanks').text('Kérjük, add meg a neved!');
  }
});

// 6️⃣ Mini feladatok
$('#btnText').on('click', function() {
  $('#para').text('Új szöveg jQuery-vel!');
});

$('#btnToggle').on('click', function() {
  $('#box').toggleClass('highlight');
});

$('#btnAjax').on('click', function() {
  $.get('https://httpbin.org/get', function(data) {
    $('#result').text(JSON.stringify(data, null, 2));
  });
});
