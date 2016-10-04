
'use strict';

$(function(){
  //TODO:REMOVE
  // $('.js-main-content').removeClass('hidden');

  let hasShownCaret = false;
  const $gsLogo = $('.js-logo');
  const $modal = $('.js-modal');
  const $modalToggler = $('.js-modal-toggle');
  const $link = $('.js-link');

  $('body').imagesLoaded(startLoadAnimation);

  $modalToggler.click(createModal);
  $link.click(openLink);

  function startLoadAnimation() {
    window.setTimeout(() => {
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
    }, 100);
  }

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
    window.open(linkDb[key]).focus();
  }

  const linkDb = {
    github: 'https://github.com/gsalisi',
    linkedin: 'https://www.linkedin.com/in/geoffreysalisi',
    resume: 'http://geoffreysalisi.com/gsalisi_resume.pdf'
  };
  const db = {
    frontend: {
      label: 'Frontend Engineering',
      description: 'Years of experience in building user interfaces for web, mobile and native applications',
      bullets: [
        '2+ years of hands-on experience in AngularJS 1.X-- proficiency in all its features and implementation',
        'Follows up-to-date best practices and developments in the HTML, CSS and JavaScript community',
        'Uses a wide array of front-end tools such as npm, grunt, gulp, browserify, babel, less etc.',
        'Takes great pride in creating beautiful and polished user interfaces that allows for a pleasurable user experience',
        'Used to develop Android applications and an IDE for SAP in Java',
        ]
    }, backend: {
      label: 'Backend Engineering',
      description: '3 internships worth of full-stack application development experience',
      bullets: [
        'Strong object-oriented programming understanding and other software design patterns',
        'Developed web application features that required changes on the frontend, API layer, service layer and database',
        'Used server-side technologies such as Flask, Spring MVC, Thrift and NodeJS',
        'Maintained a multi-platform low-level application that runs natively in Linux, Mac and Windows',
      ]
    }, core: {
      label: 'BS Computer Engineering',
      description: 'University of Waterloo, Expected Graduation May 2017',
      bullets: [
        'Learned and implemented adaptive and cooperative algorithms such as PSO and ACO',
        'Gained fundamental distributed computing concepts and developed basic Hadoop and Spark projects',
        'Practical understanding of different search algorithms, data structures and their runtime/space complexities',
        'Understands lower level computing concepts such as OS, compilers, memory allocation, processes and threads',
        'Experenced with command line tools, linux bash environment and even circuits!'
        ]
    }, others: {
      label: 'Other software related interests',
      description: 'Some new/old things that I aspire to learn or use!',
      bullets: [
        'Learn React framework to keep up with the new front-end trends', 
        'Try React Native; it looks promising with its goal to unify the frontend with none other than JavaScript',
        'Desire to try out mobile application development again, possibly IOS.',
        'Gain more experience with database technologies such as PostgreSQL and SQL'
      ]
    },  dance: {
      label: 'Urban Hiphop Choreography',
      description: '6 years of dancing to urban hiphop choreography competitively and as a hobby',
      bullets: [
        'Competed for Bring your own Beat (BYOB 2014), Ontario University Competition for HipHop (OUCH 2012, 2013 and 2015)',
        'Co-directed OUCH competitive teams: Origins and Kindred Culture',
        'Teaches and dances with University of Waterloo Hiphop Club since 2012',
        'Joined University of the Philippines Los Banos Street Jazz Dance Company in 2010 to 2011',
        'Choreographed a set for the charity fashion show of Fashion for Change in 2014 and 2015'
      ],
      link: {
        label: 'Oh really?',
        href: 'https://www.youtube.com/playlist?list=PLPoHClbCHMj2Yr9EEYynUsa9Z5AKb37M0'
      }
    }, work_delphix: {
      label: 'Frontend Engineering Intern',
      description: 'Delphix :: San Francisco, California :: September 2016 - December 2016',
      bullets: [
        'Develops and maintains the user interface of the main Delphix Engine',
        'Uses AngularJS and Knockout.js as the main JavaScript frameworks/tool',
      ],
      link: {
        label: 'More info',
        href: 'https://www.delphix.com'
      }
    }, work_compass: {
      label: 'Software Engineering Intern',
      description: 'Compass :: New York, New York :: January 2016 - July 2016',
      bullets: [
        'Created an automated tour itinerary builder with optimized routes: Leveraged several Google APIs; cuts time to plan tour from hours to minutes',
        'Created an Angular static map service that wraps Google\'s directions service that creates a map with markers and polylines for directions',
        'Implemented the full-stack search functionality for our Documents center',
        'Modified Java Thrift server; Added MongoDB indexing; Created front-end search bar component',
        'Helped build a pdf export tool that renders HTML, converts it to PDF and downloads it'
      ],
      link: {
        label: 'More info',
        href: 'https://www.compass.com'
      }
    }, work_sap: {
      label: 'Software Developer, In Memory',
      description: 'SAP Canada :: Waterloo, ON :: May 2015 - August 2015',
      bullets: [
        'Worked on SAP Smart Data Streaming (SDS) Development Studio based on Eclipse Platform',
        'Integrated JUnit tests to the E2E test harness using bash script and Python',
        'Developed and tested software for Windows and Linux OS locally and on a VM remotely',
        'Maintained different parts of the stack such as the streaming server, SDK, compiler, etc.'
      ],
      link: {
        label: 'More info',
        href: 'http://help.sap.com/hana_options_sds/'
      }
    }, work_rbc: {
      label: 'Fullstack Software Developer',
      description: 'Royal Bank of Canada, Capital Markets :: Toronto, Ontario :: May 2015 - August 2015',
      bullets: [
        'Built Market Risk web applications using Java Spring MVC, HTML, CSS and Javascript',
        'Created an Angular Boilerplate and security testing for as proof of concept',
        'Closely worked with a designer in building the user interface and enhance user experience'
      ], 
      link: {
        label: 'More info',
        href: 'http://campus.rbccm.com/en/home/our-programs/risk-management/'
      }
    }, work_other: {
      label: 'Other work experience',
      bullets: [
        'Technical Support Representative - University of Waterloo',
        'Desktop Support Technician - Ontario Hospital\'s Association',
        'General Labourer - Wing\'s Food Product',
        'Park Sweeper - Canada\'s Wonderland'
      ]
    }
  };
  
});