# How to use PageIntro
a step by step user guide plugin based on jQuery

#step 1: Load the pageintro.css, jquery and pageintro.js to style the guided tours.
<link href="dist/pageintro.css" rel="stylesheet">
<script src="//code.jquery.com/jquery.min.js"></script>
<script src="dist/pageintro.js"></script>

#step 2: Add custom options and configure the selector and text which should appare
var options = {
    container: 'body',
    spacing: 20,
    actions: {
      next: {
        text: 'Next step',
        class: 'btn btn-default'
      },
      finish: {
        text: 'OK! I know',
        class: 'btn btn-success'
      }
    },
    entries: [
      {
        selector: '#step1',
        text: 'You know, this is title'
      }, {
        selector: '#step2',
        text: 'This is description'
      }, {
        selector: '#step3',
        text: 'This is example text',
        onEnter: function () {
          $('#step3').text('Good job!');
        },
        onExit: function () {
          $('#step3').text('This example text is changed!');
        }
      }
    ]
};


#step 3: Initialize and start the guide on start

PageIntro.init(options);
PageIntro.start();
