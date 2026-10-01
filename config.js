/* =========================================================
   CONFIGURAÇÃO DO SITE D'BUCO
   É o único arquivo que vocês precisam editar.
   ========================================================= */

window.SITE_CONFIG = {
  // WhatsApp que recebe os pedidos: 55 + DDD + número, só dígitos
  whatsapp: "5581999999999",

  // E-mails (conta Google) que podem apagar qualquer publicação da Folha.
  // Use os mesmos e-mails no arquivo firestore.rules.
  admins: ["seuemail@gmail.com"],

  // Cole aqui o firebaseConfig do seu projeto (passo 2 do LEIA-ME).
  // Enquanto apiKey estiver vazio, a Folha roda em MODO TESTE:
  // as publicações ficam salvas só no navegador de quem escreveu.
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  }
};
