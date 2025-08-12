import 'normalize.css';
import 'accordion-js/dist/accordion.min.css';
import './css/styles.css';

import './js/header';
import './js/loader';
import './js/furniture-detail';
import './js/order-modal-form';
import './js/feedback';

import Accordion from 'accordion-js';

new Accordion('.accordion-container', {
  duration: 400,
  showMultiple: false,
});
