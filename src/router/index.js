import { createRouter, createWebHistory } from 'vue-router';
import ContactList from '../components/ContactList.vue';
import ContactDetails from '../components/ContactDetails.vue';
import ContactForm from '../components/ContactForm.vue';

const routes = [
  { path: '/', component: ContactList, name: 'contact-list' },
  { path: '/contact/:id', component: ContactDetails, name: 'contact-details', props: true },
  { path: '/contact/:id/edit', component: ContactForm, name: 'edit-contact', props: true },
  { path: '/new-contact', component: ContactForm, name: 'new-contact' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
