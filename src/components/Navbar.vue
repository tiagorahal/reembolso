<template>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/reembolsos">Reembolsos</router-link></li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  nav {
    background: #333;
    padding: 1rem;
  }
  ul {
    display: flex;
    list-style: none;
    gap: 1rem;
  }
  a {
    color: white;
    text-decoration: none;
  }
  </style>
  