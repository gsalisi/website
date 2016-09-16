
'use strict';
$(function(){

  const modal = $('.js-modal');

  $('.js-modal-toggle').click((event) => {
    modal.addClass('md-show');

    const key = $(event.target).attr('data');
    const dataObj = db[key];

    $('#js-modal-title').text(dataObj.label);
    $('#js-modal-description').text(dataObj.description);
    const $list = $('#js-modal-desc-ul');

    if(dataObj.bullets) {
      dataObj.bullets.forEach((val) => {
        $list.append(`<li class="gs-modal-list">${val}</li>`);  
      });
    }
    
    // on close listener
    $('.js-modal-closeBtn').click(() => {
      modal.removeClass('md-show');
      $('.js-modal-closeBtn').off('click');
      $list.empty();
    });
  });
  
  const db = {
    angularjs: {
      label: 'Angular JS',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in libero in nisi ornare malesuada.',
      bullets: ['2 years bruh, 2 years', 'I\'d say I\'m pretty dang good at this', 'designing apis please']
    }, javascript: {
      label: 'JavaScript (ES 2015)',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in libero in nisi ornare malesuada. Nunc sit amet nisl scelerisque quam porttitor congue sit amet non lorem. Maecenas malesuada risus id magna laoreet rutrum. Nullam dignissim erat eget porta rhoncus. Morbi aliquet velit ac porta finibus. Nulla et felis at arcu viverra facilisis.'
    }, htmlcss: {
      label: 'HTML & CSS',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in libero in nisi ornare malesuada. Nunc sit amet nisl scelerisque quam porttitor congue sit amet non lorem. Maecenas malesuada risus id magna laoreet rutrum. Nullam dignissim erat eget porta rhoncus. Morbi aliquet velit ac porta finibus. Nulla et felis at arcu viverra facilisis.'
    }
  };
  
});