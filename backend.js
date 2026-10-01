/* =========================================================
   CONEXÃO DA FOLHA COM O BANCO DE DADOS
   Firebase (Firestore + login Google) quando configurado;
   modo teste com localStorage quando não.
   ========================================================= */
window.FOLHA_BACKEND = (async () => {
  const cfg = (window.SITE_CONFIG || {}).firebase || {};
  const V = "10.12.2";

  if (cfg.apiKey) {
    try {
      const [{ initializeApp }, fs, au] = await Promise.all([
        import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
        import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`),
        import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`)
      ]);
      const app = initializeApp(cfg);
      const db = fs.getFirestore(app);
      const auth = au.getAuth(app);
      const posts = fs.collection(db, "posts");
      const toUser = u => u ? { id: u.uid, name: u.displayName || "", email: u.email || "" } : null;
      return {
        mode: "firebase",
        onUser: cb => au.onAuthStateChanged(auth, u => cb(toUser(u))),
        login: () => au.signInWithPopup(auth, new au.GoogleAuthProvider()),
        logout: () => au.signOut(auth),
        subscribe: (cb, onErr) => fs.onSnapshot(
          fs.query(posts, fs.orderBy("createdAt", "desc"), fs.limit(300)),
          snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
          onErr),
        newId: () => fs.doc(posts).id,
        save: (id, data) => fs.setDoc(fs.doc(db, "posts", id), data),
        remove: id => fs.deleteDoc(fs.doc(db, "posts", id))
      };
    } catch (err) {
      console.error("Firebase não carregou:", err);
      return { mode: "offline" };
    }
  }

  /* ---------- MODO TESTE (sem Firebase) ---------- */
  const KEY = "dbuco-folha-teste";
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; } };
  const write = list => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { throw { code: "quota" }; } };
  let list = read();
  if (!list) {
    list = [{
      id: "boas-vindas", authorId: "equipe", authorName: "Equipe D'BUCO", signature: "Equipe D'BUCO",
      title: "Por que a bandeira virou folha", kind: "colecao", layout: "manchete", piece: "tee-psv", image: "",
      createdAt: Date.now() - 86400000,
      body: "Quando a gente desenhou o logo da D'BUCO, a ideia era simples: Pernambuco não é só lugar de onde a gente vem, é coisa que brota na gente.\n\nPor isso a bandeira saiu do retângulo e virou folha, pousada em cima das letras como quem nasceu ali.\n\nA Folha é o espaço pra contar essas histórias: de onde veio cada estampa, o que inspirou cada coleção, como as camisas são feitas e o que mais vocês quiserem dividir. Escreve aí."
    }];
    try { write(list); } catch (e) {}
  }
  const listeners = [];
  const emit = () => { const sorted = [...list].sort((a, b) => b.createdAt - a.createdAt); listeners.forEach(cb => cb(sorted)); };
  let userCb = null, user = null;
  return {
    mode: "teste",
    onUser: cb => { userCb = cb; cb(user); },
    login: async () => { user = { id: "local", name: "Você (modo teste)", email: "" }; userCb && userCb(user); },
    logout: async () => { user = null; userCb && userCb(null); },
    subscribe: cb => { listeners.push(cb); setTimeout(emit, 0); return () => {}; },
    newId: () => "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    save: async (id, data) => { list = list.filter(p => p.id !== id).concat({ id, ...data }); write(list); emit(); },
    remove: async id => { list = list.filter(p => p.id !== id); write(list); emit(); }
  };
})();
