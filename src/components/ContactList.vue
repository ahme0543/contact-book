<template>
  <div>
    <h1>Contact List</h1>
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search by last name..."
    />
    <ul>
      <li v-for="contact in filteredContacts" :key="contact.id">
        <router-link :to="{ name: 'contact-details', params: { id: contact.id } }">
          {{ contact.lastName }}, {{ contact.firstName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      contacts: [
        // This will be populated from Local Storage in mounted() hook
      ],
    };
  },
  computed: {
    filteredContacts() {
      return this.contacts.filter((contact) =>
        contact.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  mounted() {
    // Load contacts from Local Storage
    const savedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.contacts = savedContacts;
  },
};
</script>
