/* ══════════════════════════════════════════════════════════════
   SACHIN DEEP CLEANING — LANDING PAGE SHARED BEHAVIOUR
   Reads window.LP_CONFIG for per-page specifics:
     service, source, tracking, slotsDefault, waMsg
   Handles: scarcity slots, countdown, FAQ, before/after slider,
   form submit (Firebase + Cloud Fn + GA4), booking popup,
   WhatsApp nudge, video carousel, scroll reveal, A/B variant.
══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var CONFIG = window.LP_CONFIG || {};
  var SERVICE = CONFIG.service || "Deep Cleaning";
  var SOURCE = CONFIG.source || "lp-generic";
  var TRACKING = CONFIG.tracking || "Generic";
  var WA_MSG = CONFIG.waMsg || ("Hi, I want to book " + SERVICE.toLowerCase() + " in Gurgaon.");
  var SLOTS_DEFAULT = CONFIG.slotsDefault || 5;
  var WA_NUMBER = "919267905943";

  /* ── Scarcity slots (hour-aware, per page default) ───── */
  (function () {
    var slotMap = [7, 6, 5, 4, 6, 5, 4, 3, 5, 4, 3, 2, 4, 3, 2, 4, 5, 6, 4, 3, 5, 6, 5, 6];
    var h = new Date().getHours();
    var s = Math.max(2, (slotMap[h] || SLOTS_DEFAULT));
    var bar = document.getElementById("slotsBar");
    if (bar) bar.textContent = s;
    var sf = document.getElementById("slotsForm");
    if (sf) sf.textContent = s + " left";
  })();

  /* ── Callback time randomiser ──────────────────────── */
  (function () {
    var times = ["under 3 min", "2 min 45 sec", "3 min 10 sec", "under 5 min", "3 min 30 sec"];
    var el = document.getElementById("callbackTime");
    if (el) el.textContent = times[Math.floor(Math.random() * times.length)];
  })();

  /* ── Countdown timer (resets at midnight) ──────────── */
  (function () {
    function tick() {
      var now = new Date();
      var end = new Date();
      end.setHours(23, 59, 59, 0);
      var diff = Math.max(0, Math.floor((end - now) / 1000));
      var h = String(Math.floor(diff / 3600)).padStart(2, "0");
      var m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      var s = String(diff % 60).padStart(2, "0");
      var cH = document.getElementById("ctH");
      var cM = document.getElementById("ctM");
      var cS = document.getElementById("ctS");
      if (cH) cH.textContent = h;
      if (cM) cM.textContent = m;
      if (cS) cS.textContent = s;
      if (window.gtag) gtag("event", "countdown_view", { event_category: "Engagement", event_label: SOURCE });
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* ── FAQ accordion ─────────────────────────────────── */
  window.toggleFaq = function (btn) {
    var item = btn.closest(".faq-item");
    if (!item) return;
    var isOpen = item.classList.contains("open");
    var all = document.querySelectorAll(".faq-item.open");
    for (var i = 0; i < all.length; i++) all[i].classList.remove("open");
    if (!isOpen) item.classList.add("open");
  };

  /* ── Scroll to form ────────────────────────────────── */
  window.scrollToForm = function (service) {
    var card = document.getElementById("formCard");
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      var n = document.getElementById("fname");
      if (n) setTimeout(function () { n.focus(); }, 600);
    }
    if (window.gtag) gtag("event", "service_select", { event_category: "Engagement", event_label: service || SERVICE });
  };

  /* ── Before / After slider (signature) ────────────── */
  (function () {
    var blocks = document.querySelectorAll("[data-ba]");
    blocks.forEach(function (ba) {
      var before = ba.querySelector(".ba-before");
      var handle = ba.querySelector(".ba-handle");
      var range = ba.querySelector(".ba-range");
      if (!before || !range) return;
      function update(val) {
        var v = parseFloat(val) || 50;
        before.style.clipPath = "inset(0 " + (100 - v) + "% 0 0)";
        if (handle) handle.style.left = v + "%";
      }
      range.addEventListener("input", function () { update(this.value); });
      update(range.value || 50);
      // allow dragging anywhere on the block
      var dragging = false;
      function setFromX(clientX) {
        var r = ba.getBoundingClientRect();
        var pct = ((clientX - r.left) / r.width) * 100;
        pct = Math.max(0, Math.min(100, pct));
        range.value = pct;
        update(pct);
      }
      ba.addEventListener("pointerdown", function (e) { dragging = true; setFromX(e.clientX); });
      window.addEventListener("pointermove", function (e) { if (dragging) setFromX(e.clientX); });
      window.addEventListener("pointerup", function () { dragging = false; });
    });
  })();

  /* ── Scroll reveal ──────────────────────────────────── */
  (function () {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  })();

  /* ── Phone input: digits only ──────────────────────── */
  var phoneEl = document.getElementById("fphone");
  if (phoneEl) {
    phoneEl.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });
  }

  /* ── Firebase lazy loader ───────────────────────────── */
  window.firebaseReady = false;
  window.firebaseLoaded = false;
  window.loadFirebase = function () {
    if (window.firebaseLoaded) return;
    window.firebaseLoaded = true;
    var s1 = document.createElement("script");
    s1.src = "https://www.gstatic.com/firebasejs/10.7.2/firebase-app-compat.js";
    s1.async = true;
    s1.onload = function () {
      var s2 = document.createElement("script");
      s2.src = "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore-compat.js";
      s2.async = true;
      s2.onload = function () {
        try {
          if (!firebase.apps || firebase.apps.length === 0) {
            firebase.initializeApp({
              apiKey: window.FIREBASE_API_KEY,
              authDomain: window.FIREBASE_AUTH_DOMAIN,
              databaseURL: window.FIREBASE_DATABASE_URL,
              projectId: window.FIREBASE_PROJECT_ID,
              storageBucket: window.FIREBASE_STORAGE_BUCKET,
              messagingSenderId: window.FIREBASE_MESSAGING_SENDER_ID,
              appId: window.FIREBASE_APP_ID,
              measurementId: window.FIREBASE_MEASUREMENT_ID
            });
          }
          window.firebaseReady = true;
        } catch (e) { console.error("Firebase init error:", e); }
      };
      document.head.appendChild(s2);
    };
    document.head.appendChild(s1);
  };
  (function () {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      window.loadFirebase();
    } else {
      document.addEventListener("focusin", function (e) {
        if (e.target && e.target.closest && e.target.closest("#leadForm")) window.loadFirebase();
      }, { once: true });
      window.addEventListener("scroll", function () {
        if (!window.firebaseLoaded && window.scrollY > 600) window.loadFirebase();
      }, { once: true });
    }
  })();

  /* ── Form submit ────────────────────────────────────── */
  window.handleSubmit = async function (evt) {
    evt.preventDefault();
    var nameEl = document.getElementById("fname");
    var phoneEl2 = document.getElementById("fphone");
    var btn = document.getElementById("submitBtn");
    var errEl = document.getElementById("errorMsg");
    if (!nameEl || !phoneEl2) return;
    var name = nameEl.value.trim();
    var phone = phoneEl2.value.trim();

    nameEl.classList.remove("error");
    phoneEl2.classList.remove("error");
    if (errEl) errEl.style.display = "none";

    if (!name || name.length < 2) {
      nameEl.classList.add("error");
      if (errEl) { errEl.textContent = "❌ Please enter your full name."; errEl.style.display = "block"; }
      nameEl.focus();
      return;
    }
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      phoneEl2.classList.add("error");
      if (errEl) { errEl.textContent = "❌ Enter a valid 10-digit Indian mobile number."; errEl.style.display = "block"; }
      phoneEl2.focus();
      return;
    }

    if (btn) { btn.disabled = true; btn.textContent = "⏳ Sending..."; }

    try {
      if (!window.firebaseReady) {
        window.loadFirebase();
        for (var i = 0; i < 30 && !window.firebaseReady; i++) {
          await new Promise(function (r) { setTimeout(r, 100); });
        }
      }
      if (window.firebaseReady && window.firebase && firebase.apps && firebase.apps.length > 0) {
        var db = firebase.firestore();
        await db.collection("landingPageLeads").add({
          name: name, phone: phone,
          service: SERVICE,
          source: SOURCE,
          url: window.location.href,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
      // NOTE: Lead email is sent by the onLandingPageLeadCreated Firestore
      // trigger (functions/index.js) — it emails BOTH owner inboxes. A direct
      // fetch to sendLandingPageEmail here caused a duplicate email, so it is
      // intentionally removed. The Firestore write above is the single trigger.

      var called = document.getElementById("calledPhone");
      if (called) called.textContent = "+91 " + phone;
      var form = document.getElementById("leadForm");
      if (form) form.style.display = "none";
      var ok = document.getElementById("successMsg");
      if (ok) ok.style.display = "block";
      var od = document.querySelector(".or-divider"); if (od) od.remove();
      var wf = document.querySelector(".btn-wa-form"); if (wf) wf.remove();

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "form_submission", name: name, phone: phone, service: SERVICE });
      if (typeof gtag !== "undefined") {
        gtag("event", "generate_lead", { event_category: "Lead", event_label: TRACKING + " Landing" });
      }

      var msg = "Hi! 👋 My name is " + name + " (+91 " + phone + "). I just requested a quote for " + SERVICE.toLowerCase() + " on your website. Please share the price. Thanks!";
      var link = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
      setTimeout(function () { showWaNudge(name, phone, link); }, 1200);
    } catch (err) {
      console.error(err);
      if (errEl) { errEl.textContent = "❌ Something went wrong. Please call +91 92679-05943"; errEl.style.display = "block"; }
      if (btn) { btn.disabled = false; btn.textContent = "🧹 GET MY FREE QUOTE NOW →"; }
    }
  };

  /* ── Social proof (recently booked) popup ──────────── */
  var cityPools = {
    delhi: [
      { i: "R", name: "Rahul V.", detail: "Booked " + SERVICE.toLowerCase(), area: "Dwarka" },
      { i: "P", name: "Priya S.", detail: "Booked " + SERVICE.toLowerCase(), area: "Rohini" },
      { i: "A", name: "Amit K.", detail: "Booked " + SERVICE.toLowerCase(), area: "Lajpat Nagar" },
      { i: "S", name: "Sunita D.", detail: "Booked " + SERVICE.toLowerCase(), area: "Janakpuri" },
      { i: "N", name: "Neha G.", detail: "Booked " + SERVICE.toLowerCase(), area: "Saket" },
      { i: "V", name: "Vikram P.", detail: "Booked " + SERVICE.toLowerCase(), area: "Pitampura" }
    ],
    noida: [
      { i: "R", name: "Rohit T.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 62" },
      { i: "P", name: "Priya A.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 18" },
      { i: "A", name: "Ankit K.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 15" },
      { i: "S", name: "Shweta M.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 44" },
      { i: "N", name: "Nitin R.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 34" },
      { i: "V", name: "Vandana S.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 52" }
    ],
    "greater-noida": [
      { i: "R", name: "Ravi K.", detail: "Booked " + SERVICE.toLowerCase(), area: "Alpha 1" },
      { i: "P", name: "Pooja G.", detail: "Booked " + SERVICE.toLowerCase(), area: "Beta 2" },
      { i: "A", name: "Arun S.", detail: "Booked " + SERVICE.toLowerCase(), area: "Gamma 1" },
      { i: "S", name: "Sonia R.", detail: "Booked " + SERVICE.toLowerCase(), area: "Delta 3" },
      { i: "N", name: "Navneet K.", detail: "Booked " + SERVICE.toLowerCase(), area: "Omega 1" },
      { i: "V", name: "Varun M.", detail: "Booked " + SERVICE.toLowerCase(), area: "Ecotech 3" }
    ],
    faridabad: [
      { i: "R", name: "Rajesh K.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 21" },
      { i: "P", name: "Priyanka M.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 14" },
      { i: "A", name: "Amit S.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 16" },
      { i: "S", name: "Seema R.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 29" },
      { i: "N", name: "Naresh G.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 46" },
      { i: "V", name: "Vineet A.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 86" }
    ],
    gurgaon: [
      { i: "P", name: "Priya M.", detail: "Booked " + SERVICE.toLowerCase(), area: "DLF Phase 3" },
      { i: "A", name: "Amit K.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sector 45" },
      { i: "S", name: "Sunita A.", detail: "Booked " + SERVICE.toLowerCase(), area: "Golf Course Rd" },
      { i: "R", name: "Rohit G.", detail: "Booked " + SERVICE.toLowerCase(), area: "Sohna Road" },
      { i: "N", name: "Neha T.", detail: "Booked " + SERVICE.toLowerCase(), area: "Palam Vihar" },
      { i: "V", name: "Vikram S.", detail: "Booked " + SERVICE.toLowerCase(), area: "MG Road" }
    ]
  };
  cityPools.gurugram = cityPools.gurgaon;
  var canonical = document.querySelector('link[rel="canonical"]');
  var pageUrl = canonical ? canonical.getAttribute("href") : window.location.href;
  var cityMatch = pageUrl.match(/\-(gurgaon|gurugram|delhi|noida|greater\-noida|faridabad)\.html$/);
  var cityKey = cityMatch ? cityMatch[1] : "gurgaon";
  if (cityKey === "gurugram") cityKey = "gurgaon";
  var bookings = CONFIG.bookings || cityPools[cityKey] || cityPools.gurgaon;
  var timeAgo = ["2 minutes ago", "5 minutes ago", "8 minutes ago", "12 minutes ago", "18 minutes ago", "24 minutes ago"];
  function showBookingPopup() {
    var b = bookings[Math.floor(Math.random() * bookings.length)];
    var popup = document.getElementById("bookingPopup");
    if (!popup) return;
    var av = document.getElementById("bpAv");
    var nm = document.getElementById("bpName");
    var dt = document.getElementById("bpDetail");
    var tm = document.getElementById("bpTime");
    if (av) av.textContent = b.i;
    if (nm) nm.textContent = b.name + " (" + b.area + ")";
    if (dt) dt.textContent = b.detail;
    if (tm) tm.textContent = timeAgo[Math.floor(Math.random() * timeAgo.length)];
    popup.classList.add("show");
    setTimeout(function () { popup.classList.remove("show"); }, 5000);
  }
  var popupShown = false;
  var firstSection = document.querySelector(".section");
  if (firstSection && "IntersectionObserver" in window) {
    var bo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !popupShown) {
          popupShown = true;
          showBookingPopup();
          setInterval(showBookingPopup, 25000);
        }
      });
    }, { threshold: 0.3 });
    bo.observe(firstSection);
  }

  /* ── Video carousel (optional) ─────────────────────── */
  (function () {
    var videoEl = document.getElementById("proofVideo");
    if (!videoEl) return;
    var videos = CONFIG.videos || ["../videos/cleaning-1.mp4", "../videos/cleaning-2.mp4", "../videos/cleaning-3.mp4", "../videos/cleaning-4.mp4"];
    var idx = 0;
    function initDots() {
      var c = document.getElementById("dotsContainer");
      if (!c) return;
      c.innerHTML = "";
      videos.forEach(function (_, i) {
        var d = document.createElement("button");
        d.style.cssText = "width:10px;height:10px;border-radius:50%;background:" + (i === idx ? "var(--accent)" : "#d1d5db") + ";border:none;cursor:pointer;transition:all .2s";
        if (i === idx) { d.style.width = "24px"; d.style.borderRadius = "6px"; }
        d.onclick = function (e) { e.preventDefault(); goTo(i); };
        c.appendChild(d);
      });
    }
    window.changeVideo = function (dir) { idx = (idx + dir + videos.length) % videos.length; update(); };
    function goTo(i) { idx = i; update(); }
    function update() {
      var src = document.getElementById("videoSource");
      if (src) src.src = videos[idx];
      videoEl.load();
      var cur = document.getElementById("currentVideo");
      if (cur) cur.textContent = idx + 1;
      initDots();
    }
    initDots();
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") window.changeVideo(-1);
      if (e.key === "ArrowRight") window.changeVideo(1);
    });
    videoEl.addEventListener("play", function () {
      if (window.gtag) gtag("event", "video_play", { event_category: "Engagement", event_label: SERVICE + " Video " + (idx + 1) });
    });
    videoEl.addEventListener("ended", function () {
      if (window.gtag) gtag("event", "video_complete", { event_category: "Engagement", event_label: SERVICE + " Video " + (idx + 1) });
    });
  })();

  /* ── WhatsApp nudge (post-submit) ─────────────────── */
  window.showWaNudge = function (name, phone, waLink) {
    var nudge = document.getElementById("waNudge");
    var btn = document.getElementById("waNudgeBtn");
    var preview = document.getElementById("waNudgePreview");
    if (!nudge) return;
    function esc(s) { return String(s).replace(/[&<>"']/g, function(c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
    if (preview) {
      preview.innerHTML = "💬 Pre-filled: <strong>\"Hi, my name is " + esc(name || "there") +
        " (+91 " + esc(phone || "") + "). I just requested a quote. Please share " + esc(SERVICE.toLowerCase()) + " pricing. Thanks!\"</strong>";
    }
    if (btn) btn.href = waLink;
    nudge.classList.add("show");
    setTimeout(function () { nudge.classList.remove("show"); }, 30000);
  };
  window.closeWaNudge = function () {
    var n = document.getElementById("waNudge");
    if (n) n.classList.remove("show");
  };

  /* ── A/B variant tracking ───────────────────────────── */
  (function () {
    if (!localStorage.getItem("ab_variant")) {
      localStorage.setItem("ab_variant", Math.random() > 0.5 ? "vA" : "vB");
    }
    if (typeof gtag !== "undefined") {
      gtag("event", "page_view_variant", { variant: localStorage.getItem("ab_variant"), page_title: document.title });
    }
  })();
})();
