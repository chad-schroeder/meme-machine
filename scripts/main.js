const formContainer = document.querySelector('.form-container');
const form = formContainer.querySelector('form');
const memeHeader = form.querySelector('#headerText');
const memeURL = form.querySelector('#memeURL');
const memeFooter = form.querySelector('#footerText');
const imageHelper = form.querySelector('#memeHelper');
const button = form.querySelector('button[type=submit]');
const deck = document.querySelector('.meme-deck .meme-deck-scroll');
const sparks = document.querySelector('.robot-sparks');

// on meme click, delete
const deleteMeme = event => {
  if (!event.target.closest('.meme')) return;
  event.target.remove();
};

// on form submission...
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // construct image
  const img = new Image();
  img.src = memeURL.value;

  // if image not found...
  img.onerror = () => {
    let hasImage = false;
    imageHelper.style.display = 'block';
    console.log('Error: ', hasImage);
  };

  // if image found...
  img.onload = () => {
    // update button text
    button.textContent = 'Generating...';
    // turn on robot sparks
    sparks.classList.add('blink-1');
    // start container shake
    formContainer.classList.add('vibrate-1');
    // output meme and stop animations
    setTimeout(() => {
      button.textContent = 'Generate';
      sparks.classList.remove('blink-1');
      formContainer.classList.remove('vibrate-1');

      // construct meme
      const meme = document.createElement('div');
      meme.classList.add('meme', 'bounceIn');

      // include optional header text
      if (memeHeader.value) {
        const header = document.createElement('span');
        header.classList.add('header-text');
        header.textContent = memeHeader.value;
        meme.appendChild(header);
      }

      // includes optional footer text
      if (memeFooter.value) {
        const footer = document.createElement('span');
        footer.classList.add('footer-text');
        footer.textContent = memeFooter.value;
        meme.appendChild(footer);
      }

      meme.appendChild(img);
      deck.appendChild(meme);
      imageHelper.style.display = 'none';
      form.reset();
    }, 1250);
  };
});

// listen for click inside meme area
deck.addEventListener(
  'click',
  function(event) {
    deleteMeme(event);
  },
  false
);
