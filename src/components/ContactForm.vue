<template>
  <div>
    <h1>{{ formTitle }}</h1>
    <form @submit="submitForm">
      <label>
        First Name:
        <input v-model="contact.firstName" type="text" required />
      </label>
      <label>
        Last Name:
        <input v-model="contact.lastName" type="text" required />
      </label>
      <label>
        Email:
        <input v-model="contact.email" type="email" required />
      </label>
      <!-- Other fields can be added here as needed -->
      <button type="submit">{{ submitButtonText }}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
  },
  data() {
    return {
      contact: {
        firstName: '',
        lastName: '',
        email: '',
      },
    };
  },
  computed: {
    isEditMode() {
      return this.id !== undefined;
    },
    contacts() {
      return this.$parent.contacts;
    },
    formTitle() {
      return this.isEditMode ? 'Edit Contact' : 'New Contact';
    },
    submitButtonText() {
      return this.isEditMode ? 'Save Changes' : 'Create Contact';
    },
  },
  methods: {
    submitForm(event) {
      event.preventDefault();

      if (this.isEditMode) {
        // Update existing contact in contacts array and Local Storage
        const index = this.contacts.findIndex((c) => c.id === this.id);
        if (index !== -1) {
          this.contacts.splice(index, 1, this.contact);
        }
      } else {
        // Generate a unique ID for the new contact
        this.contact.id = Date.now().toString();
        // Add the new contact to contacts array and Local Storage
        this.contacts.push(this.contact);
      }

      localStorage.setItem('contacts', JSON.stringify(this.contacts));

      // Navigate to contact details after submitting the form
      this.$router.push({ name: 'contact-details', params: { id: this.contact.id } });
    },
  },
  watch: {
    id(newId) {
      if (this.isEditMode) {
        // Update the contact data when the 'id' prop changes
        this.contact = { ...this.contacts.find((c) => c.id === newId) };
      }
    },
  },
};
</script>
