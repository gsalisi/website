window.addEventListener("load", main);

function main() {

  let db = {};
  let dbLink = {}; 

  firebase.initializeApp({
    apiKey: "AIzaSyBaDKvobTip5-6JGCPLHTEkzHOaIkxqnQ4",
    authDomain: "personal-website-b1da1.firebaseapp.com",
    databaseURL: "https://personal-website-b1da1.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "61095216394"
  });

  // firebase.auth().signInWithEmailAndPassword('public@public.com', 'public');

  const firebaseDB = firebase.database();
  firebase.auth().signInAnonymously();

  firebaseDB.ref('links').once('value').then((snapshot) => {
    dbLink = snapshot.val();
  });
  firebaseDB.ref('works_and_skills').once('value').then((snapshot) => {
    db = snapshot.val();
  });

  firebaseDB.ref('testimonials').once('value').then((snapshot) => {
   startTestimonialShuffle(snapshot.val());
  });
  let hasShownCaret = false;
  const $gsLogo = $('.js-logo');
  const $modal = $('.js-modal');
  const $modalToggler = $('.js-modal-toggle');
  const $link = $('.js-link');

  $('body').imagesLoaded(startLoadAnimation);
  $modalToggler.click(createModal);
  $link.click(openLink);

  function startLoadAnimation() {
    $gsLogo.snabbt({
      fromOpacity: 0,
      opacity: 1,
      fromScale: [0.9, 0.9],
      duration: 500,
      easing: 'ease'
    });
    window.setTimeout(() => {
      if(!hasShownCaret) {
        hasShownCaret = true;
        showCaret();
        $('.js-main-content').removeClass('hidden');
      }
      swivelLogo();
    }, 500);

    function swivelLogo() {
      $gsLogo.snabbt({
        rotation: [0, Math.PI, 0],
        easing: 'easeOut',
        duration: 600
      }).snabbt({
        fromRotation: [0, Math.PI, 0],
        rotation: [0, 2*Math.PI, 0],
        easing: 'easeOut',
        duration: 1000,
        complete() {
          rotateLogo();
        }
      }); 
    }

    function rotateLogo() {
      $gsLogo.snabbt({
        fromRotation: [0, 0, 0],
        rotation: [0, 2 * Math.PI, 0],
        duration: 15000,
        complete() {
          rotateLogo();
        }
      }); 
    }

    function showCaret() {
      const $caret = $('.js-caret-container');
      $caret.click(() => {
        animatedScrollTo( 
          $('.js-fixed-wrapper')[0], // element to scroll with (most of times you want to scroll with whole <body>)
          $('.js-main-content')[0].getBoundingClientRect().top, // target scrollY (0 means top of the page)
          1000, // duration in ms
          function() { // callback function that runs after the animation (optional)
            console.log('done!')
          }
        );
      });
      $caret.snabbt({
        fromOpacity: 0,
        opacity: 1,
        fromScale: [0.9, 0.9],
        fromPosition: [0, -10, 0],
        easing: 'ease',
        complete() {
          nudgeCaret();
        }
      });
    }

    function nudgeCaret() {
      const $caret = $('.js-caret-container');
      $caret.snabbt({
        position: [0, -10, 0],
        delay: 500,
        easing: 'ease'
      }).snabbt({
        fromPosition: [0, -10, 0],
        position: [0, 0, 0],
        easing: 'ease',
        complete() {
          nudgeCaret();
        }
      });
    }
  }

  

  function createModal(event) {
    $modal.addClass('md-show');

    const key = $(event.target).attr('data');
    const dataObj = db[key];
    const $modalTitle = $('#js-modal-title');
    const $modalDesc = $('#js-modal-description');
    const $modalList = $('#js-modal-desc-ul');
    const $modalLink = $('#js-modal-link');
    const $modalCloser = $('.js-modal-closeBtn');

    $modalTitle.text(dataObj.label);
    $modalDesc.text(dataObj.description);

    if (dataObj.bullets) {
      dataObj.bullets.forEach((val) => {
        $modalList.append(`<li class="gs-modal-list">${val}</li>`);  
      });
    }

    if (dataObj.link) {
      $modalLink.attr('data', dataObj.link.href);
      $modalLink.append(dataObj.link.label);
      $modalLink.click((event) => {
        const key = $(event.target).attr('data');
        window.open(key).focus();
      })
    }

    function closeModal() {
      $modal.removeClass('md-show');
      // $modalToggler.off('click');
      window.setTimeout(() => {
        // $modalToggler.click(createModal); //rebind
        $modalCloser.off('click'); //unbind
        $modalLink.off('click'); //unbind
        $modalDesc.empty();
        $modalTitle.empty();
        $modalList.empty();
        $modalLink.empty();
      }, 300);
    }

    // bind close listeners
    $(document).keyup(function(e) {
      if (e.keyCode === 27) closeModal();   // esc
    });
    $modal.click(() => closeModal());
    $modalCloser.click(() => closeModal());
  }

  function openLink(event) {
    const key = $(event.target).attr('data');
    window.open(dbLink[key]).focus();
  }

  function startTestimonialShuffle(dbTestimonial) {
    const testi = $('.js-testi');
    const testiCtr = $('.js-testi-text');
    const testiOwnerCtr = $('.js-testi-owner');

    let i = 0;
    testiCtr.text(dbTestimonial[i].text);
    testiOwnerCtr.text(dbTestimonial[i].owner);
    i++;
    function shuffleTesti() {
      if (i >= dbTestimonial.length) {
        i = 0;
      }
      testi.snabbt({
        fromOpacity: 0,
        opacity: 1,
      }).snabbt({
        delay: dbTestimonial[i].length,
        fromOpacity: 1,
        opacity: 0,
        complete() {
          testiCtr.text(dbTestimonial[i].text);
          testiOwnerCtr.text(dbTestimonial[i].owner);
          i++;
          shuffleTesti();
        }
      }); 
    }
    shuffleTesti();
  }
}
  //end of main