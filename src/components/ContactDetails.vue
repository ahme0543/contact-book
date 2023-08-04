<template>
  <div>
    <h1>{{ contact.firstName }} {{ contact.lastName }}</h1>
    <p>Email: {{ contact.email }}</p>
    <p>Other fields can be displayed here.</p>
    <router-link :to="{ name: 'edit-contact', params: { id: contact.id } }">
      Edit Contact
    </router-link>
    <button @click="deleteContact">Delete Contact</button>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      contact: {},
    };
  },
  methods: {
    deleteContact() {
      // Delete the contact from the contacts array and Local Storage
      this.contacts = this.contacts.filter((c) => c.id !== this.id);
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
      // Navigate back to contact list after deleting
      this.$router.push({ name: 'contact-list' });
    },
  },
  computed: {
    contacts() {
      return this.$parent.contacts;
    },
  },
  watch: {
    id(newId) {
      // Update contact data when the 'id' prop changes
      this.contact = this.contacts.find((c) => c.id === newId);
    },
  },
  created() {
    // Load contact data from Local Storage
    this.contact = this.contacts.find((c) => c.id === this.id);
  },
};
</script>
