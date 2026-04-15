const sectionConfig = [
  {
    group: "VIP Event",
    sections: [
      {
        id: "vip-event",
        title: "VIP Event",
        assets: [
          { name: "Digital Invitation", file: "vip_digital-invitation.jpg" },
          { name: "30x30 Foam Board", file: "30x30_vip_foam-board.jpg" },
          { name: "PowerPoint", file: "vip_powerpoint.jpg" },
        ],
      },
    ],
  },
  {
    group: "Golf Tournament",
    sections: [
      {
        id: "event-sponsors",
        title: "Event Sponsors — 30x30 Foam Board (Easel)",
        assets: [
          { name: "All Sponsors", file: "30x30_allsponsor.jpg" },
          {
            name: "Presenting Sponsor — High Touch Technologies, Inc.",
            file: "30x30_presenting_high-touch.jpg",
          },
          { name: "19th Hole Sponsor — Farha Roofing", file: "30x30_19th-hole_farha-roofing.jpg" },
          { name: "Breakfast Sponsor — ADS, Inc.", file: "30x30_breakfast_ads.jpg" },
          { name: "Lunch Sponsor — Security 1st", file: "30x30_lunch_security-1st.jpg" },
          { name: "Apparel Sponsor — Under Armour", file: "30x30_apparel_under-armour.jpg" },
          {
            name: "Cigar Experience Sponsor — Cigar Chateau",
            file: "30x30_cigar-experience_cigar-chateau.jpg",
          },
        ],
      },
      {
        id: "special-placement",
        title: "Special Placement Sponsors (Non-Standard)",
        assets: [
          { name: "Beverage Cart — IMA, Inc.", file: "special_beverage-cart_ima.jpg" },
          { name: "Golf Cart — TBD", file: "special_golf-cart_TBD.jpg" },
        ],
      },
      {
        id: "contest-sponsors",
        title: "Contest Sponsors — 30x18 Staked Signs (Title + Logo)",
        assets: [
          { name: "Longest Putt — Dakota Western", file: "30x18_longest-putt_dakota-western.jpg" },
          {
            name: "Longest Drive — Eby Construction Company",
            file: "30x18_longest-drive_eby-construction.jpg",
          },
          { name: "Closest to the Pin — Vornado Air", file: "30x18_closest-to-pin_vornado.jpg" },
          { name: "Buy a Hole-In-One — Farris Mazars", file: "30x18_hole-in-one_farris-mazars.jpg" },
        ],
      },
      {
        id: "corporate-sponsors",
        title: "Corporate Sponsors — 30x18 Staked Signs (Title + Logo)",
        assets: [
          { name: "S.P. Richards Company", file: "30x18_corporate_sp-richards.jpg" },
          { name: "6 Meridian", file: "30x18_corporate_6-meridian.jpg" },
          { name: "LC Industries Foundation", file: "30x18_corporate_lc-industries.jpg" },
          { name: "Allen Exploration", file: "30x18_corporate_allen-exploration.jpg" },
        ],
      },
      {
        id: "hole-sponsors-ace",
        title: "Hole Sponsors — Small Format Signs (24x18) / Ace Sponsors",
        assets: [
          { name: "Belleville Boot Company", file: "24x18_ace_belleville-boot.jpg" },
          { name: "Summit Plastics", file: "24x18_ace_summit-plastics.jpg" },
          { name: "eShipping", file: "24x18_ace_eshipping.jpg" },
          { name: "Patricia A. Peer Window Gallery", file: "24x18_ace_peer-window-gallery.jpg" },
          { name: "PHI Plastics", file: "24x18_ace_phi-plastics.jpg" },
        ],
      },
      {
        id: "hole-sponsors-pin-flag",
        title: "Hole Sponsors — Small Format Signs (24x18) / Pin Flag Sponsors",
        assets: [
          { name: "Hutton", file: "24x18_pin-flag_hutton.jpg" },
          { name: "ADS, Inc.", file: "24x18_pin-flag_ads.jpg" },
        ],
      },
      {
        id: "hole-sponsors-teebox",
        title: "Hole Sponsors — Small Format Signs (24x18) / Tee Box Sponsors",
        assets: [
          { name: "Aloft Hotel Wichita", file: "24x18_teebox_aloft.jpg" },
          { name: "Capital Federal Foundation", file: "24x18_teebox_capitalfederal.jpg" },
          { name: "Enza Financial, LLC", file: "24x18_teebox_enza-financial.jpg" },
          { name: "Pratt Industries", file: "24x18_teebox_pratt-industries.jpg" },
          {
            name: "Wichita State University NIAR",
            file: "24x18_teebox_wichita-state-niar.jpg",
          },
        ],
      },
      {
        id: "hole-sponsors-birdie",
        title: "Hole Sponsors — Small Format Signs (24x18) / Birdie Sponsors",
        assets: [
          { name: "Delta Dental of Kansas", file: "24x18_birdie_delta-dental.jpg" },
          { name: "Envi Environmental", file: "24x18_birdie_envi-environmental.jpg" },
          { name: "IdeaTek", file: "24x18_birdie_ideatek.jpg" },
          { name: "Foulston Siefkin, LLP", file: "24x18_birdie_foulston-siefkin.jpg" },
        ],
      },
      {
        id: "printed-materials",
        title: "Printed Materials (8.5x11)",
        assets: [
          { name: "Mulligan Rules", file: "8.5x11_mulligan-rules.jpg" },
          { name: "Check-In Signs", file: "8.5x11_check-in.jpg" },
        ],
      },
      {
        id: "program",
        title: "Program",
        assets: [
          { name: "Program — Front", file: "program_front.jpg" },
          { name: "Program — Back", file: "program_back.jpg" },
        ],
      },
      {
        id: "day-of-materials",
        title: "Day-Of Materials",
        assets: [{ name: "PowerPoint", file: "day-of_powerpoint.jpg" }],
      },
    ],
  },
];

const assetRoot = "data/signs/";
const navRoot = document.getElementById("sidebar-nav");
const contentRoot = document.getElementById("content");
const modal = document.getElementById("asset-modal");
const modalTitle = document.getElementById("modal-title");
const modalPreview = document.getElementById("modal-preview");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");

const allAssets = sectionConfig.flatMap((group) => group.sections.flatMap((section) => section.assets));
const assetByFile = new Map(allAssets.map((asset) => [asset.file, asset]));
let activeAssetIndex = -1;

// ---------------------------------------------------------------------------
// Fuzzy filename matcher. Users rarely get the exact filename right when
// dropping art — tokens differ by separator, casing, or extra descriptors
// ("aloft-hotel" vs "aloft", "Capital Federal" vs "capitalfederal"). We fall
// back to token overlap, preferring the asset with the clearest lead.
// ---------------------------------------------------------------------------
const stripExt = (name) => name.toLowerCase().replace(/\.[^.]+$/, "");
const squishFilename = (name) => stripExt(name).replace(/[^a-z0-9]/g, "");
const tokenizeFilename = (name) =>
  stripExt(name)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

const FUZZY_THRESHOLD = 0.75;

const findAssetByFilename = (filename) => {
  // 1. Exact filename match (fast path).
  if (assetByFile.has(filename)) return assetByFile.get(filename);

  // 2. Alphanumeric-only match handles separator / casing differences, e.g.
  //    `30x30_all-sponsor.jpg` vs `30x30_allsponsor.jpg`, or
  //    `24x18_Teebox_Aloft.JPG` vs `24x18_teebox_aloft.jpg`.
  const upSquish = squishFilename(filename);
  if (upSquish) {
    for (const asset of allAssets) {
      if (squishFilename(asset.file) === upSquish) return asset;
    }
    // 2b. Unambiguous substring match — catches `capital federal.jpg` →
    //     `24x18_teebox_capitalfederal.jpg` when the user drops a bare
    //     sponsor name. Requires >=4 chars and exactly one hit so generic
    //     prefixes like `24x18` or `teebox` don't resolve arbitrarily.
    if (upSquish.length >= 4) {
      const hits = allAssets.filter((a) => {
        const s = squishFilename(a.file);
        return s.includes(upSquish) || upSquish.includes(s);
      });
      if (hits.length === 1) return hits[0];
    }
  }

  // 3. Token overlap handles missing/extra descriptors, e.g.
  //    `aloft-hotel.jpg` → `24x18_teebox_aloft.jpg`.
  const uploaded = tokenizeFilename(filename);
  if (!uploaded.length) return null;
  const uploadedSet = new Set(uploaded);

  let best = null;
  let bestScore = 0;
  let tied = false;

  for (const asset of allAssets) {
    const target = tokenizeFilename(asset.file);
    if (!target.length) continue;
    let shared = 0;
    for (const token of target) if (uploadedSet.has(token)) shared += 1;
    // Score by coverage of the smaller side — rewards partial names like
    // `aloft.jpg` matching `24x18_teebox_aloft.jpg` without inflating when
    // two assets happen to share generic tokens (24, 18, pin, flag, ...).
    const score = shared / Math.min(uploaded.length, target.length);
    if (score > bestScore) {
      best = asset;
      bestScore = score;
      tied = false;
    } else if (score === bestScore && score > 0 && asset !== best) {
      tied = true;
    }
  }

  if (!best || bestScore < FUZZY_THRESHOLD || tied) return null;
  return best;
};

// ---------------------------------------------------------------------------
// Local-only uploads (IndexedDB). Lets you preview sign art in the matrix
// without committing anything to the repo — no pushes, no builds.
// ---------------------------------------------------------------------------
const DB_NAME = "wgm-sign-uploads";
const STORE = "files";
let dbPromise;

const openDb = () => {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(STORE);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return dbPromise;
};

const idbGet = async (key) => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE, "readonly").objectStore(STORE).get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
};

const idbPut = async (key, value) => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

const idbDelete = async (key) => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

const idbAllKeys = async () => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE, "readonly").objectStore(STORE).getAllKeys();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
};

// In-memory cache of file -> object URL (reused for tile + modal previews)
const uploadUrls = new Map();
// file -> tile refresh callback, so bulk/clear actions can re-render tiles
const tileHandlers = new Map();

const revokeUrl = (file) => {
  const prev = uploadUrls.get(file);
  if (prev) {
    URL.revokeObjectURL(prev);
    uploadUrls.delete(file);
  }
};

const loadUpload = async (file) => {
  if (uploadUrls.has(file)) return uploadUrls.get(file);
  const blob = await idbGet(file);
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  uploadUrls.set(file, url);
  return url;
};

const storeUpload = async (file, blob) => {
  await idbPut(file, blob);
  revokeUrl(file);
  const url = URL.createObjectURL(blob);
  uploadUrls.set(file, url);
  updateUploadBadge();
  return url;
};

const removeUpload = async (file) => {
  await idbDelete(file);
  revokeUrl(file);
  updateUploadBadge();
};

// ---------------------------------------------------------------------------
// Tiles
// ---------------------------------------------------------------------------
const createPlaceholder = (label = "Image not uploaded yet") => {
  const holder = document.createElement("div");
  holder.className = "placeholder";
  holder.textContent = label;
  return holder;
};

const renderTilePreview = (preview, asset, localUrl) => {
  preview.replaceChildren(
    createPlaceholder(localUrl ? "Loading local upload..." : "Checking /data/signs/ for image...")
  );

  const image = new Image();
  image.loading = "lazy";
  image.alt = asset.name;

  image.addEventListener("error", () => {
    image.remove();
    preview.replaceChildren(createPlaceholder());
  });

  image.addEventListener("load", () => {
    preview.replaceChildren(image);
  });

  image.src = localUrl || `${assetRoot}${asset.file}`;
};

const buildAssetTile = (asset) => {
  const card = document.createElement("div");
  card.className = "tile";

  const preview = document.createElement("div");
  preview.className = "tile-preview";
  preview.setAttribute("role", "button");
  preview.tabIndex = 0;
  preview.setAttribute("aria-label", `Preview ${asset.name}`);

  preview.addEventListener("click", () => openModal(asset));
  preview.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(asset);
    }
  });

  const body = document.createElement("div");
  body.className = "tile-body";

  const title = document.createElement("p");
  title.className = "tile-title";
  title.textContent = asset.name;

  const fileLabel = document.createElement("p");
  fileLabel.className = "tile-file";
  fileLabel.textContent = `Expected file: ${assetRoot}${asset.file}`;

  const status = document.createElement("p");
  status.className = "tile-status";
  status.textContent = "Stored locally in your browser";
  status.hidden = true;

  const actions = document.createElement("div");
  actions.className = "tile-actions";

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.hidden = true;

  const uploadBtn = document.createElement("button");
  uploadBtn.type = "button";
  uploadBtn.className = "tile-btn";
  uploadBtn.textContent = "Upload";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "tile-btn tile-btn-remove";
  removeBtn.textContent = "Remove";
  removeBtn.hidden = true;

  const applyLocalState = (hasLocal) => {
    uploadBtn.textContent = hasLocal ? "Replace" : "Upload";
    removeBtn.hidden = !hasLocal;
    status.hidden = !hasLocal;
  };

  const refreshFromStore = async () => {
    const url = await loadUpload(asset.file);
    applyLocalState(Boolean(url));
    renderTilePreview(preview, asset, url);
  };

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please pick an image file.");
      return;
    }
    try {
      const url = await storeUpload(asset.file, file);
      applyLocalState(true);
      renderTilePreview(preview, asset, url);
      const idx = allAssets.findIndex((a) => a.file === asset.file);
      if (idx === activeAssetIndex && !modal.hidden) {
        renderModalAsset(asset);
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Sorry, that file couldn't be stored locally.");
    }
  };

  uploadBtn.addEventListener("click", () => input.click());

  input.addEventListener("change", async () => {
    const chosen = input.files?.[0];
    input.value = "";
    if (chosen) await handleFile(chosen);
  });

  removeBtn.addEventListener("click", async () => {
    await removeUpload(asset.file);
    applyLocalState(false);
    renderTilePreview(preview, asset, null);
    const idx = allAssets.findIndex((a) => a.file === asset.file);
    if (idx === activeAssetIndex && !modal.hidden) {
      renderModalAsset(asset);
    }
  });

  // Drag-and-drop directly on the preview
  preview.addEventListener("dragover", (event) => {
    if (event.dataTransfer?.types?.includes("Files")) {
      event.preventDefault();
      preview.classList.add("drag-over");
    }
  });
  preview.addEventListener("dragleave", () => preview.classList.remove("drag-over"));
  preview.addEventListener("drop", async (event) => {
    event.preventDefault();
    preview.classList.remove("drag-over");
    const dropped = event.dataTransfer?.files?.[0];
    if (dropped) await handleFile(dropped);
  });

  actions.append(input, uploadBtn, removeBtn);
  body.append(title, fileLabel, status, actions);
  card.append(preview, body);

  tileHandlers.set(asset.file, { refresh: refreshFromStore });
  refreshFromStore();

  return card;
};

const buildSection = (section) => {
  const el = document.createElement("section");
  el.className = "section";
  el.id = section.id;

  const heading = document.createElement("h2");
  heading.textContent = section.title;

  const grid = document.createElement("div");
  grid.className = "grid";

  section.assets.forEach((asset) => {
    grid.append(buildAssetTile(asset));
  });

  el.append(heading, grid);
  contentRoot.append(el);
};

const buildNav = () => {
  sectionConfig.forEach((group) => {
    const groupWrap = document.createElement("div");
    groupWrap.className = "nav-group";

    const label = document.createElement("h2");
    label.className = "nav-label";
    label.textContent = group.group;

    const list = document.createElement("ul");
    list.className = "nav-list";

    group.sections.forEach((section) => {
      buildSection(section);

      const item = document.createElement("li");
      item.className = "nav-item";

      const link = document.createElement("a");
      link.className = "nav-link";
      link.href = `#${section.id}`;
      link.dataset.target = section.id;
      link.textContent = section.title;

      link.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById(section.id).scrollIntoView({ behavior: "smooth", block: "start" });
      });

      item.append(link);
      list.append(item);
    });

    groupWrap.append(label, list);
    navRoot.append(groupWrap);
  });
};

// ---------------------------------------------------------------------------
// Bulk upload bar (match dropped files by filename)
// ---------------------------------------------------------------------------
const buildUploadBar = () => {
  const bar = document.createElement("div");
  bar.className = "upload-bar";

  const info = document.createElement("div");
  info.className = "upload-bar-info";
  info.innerHTML =
    "<strong>Upload signs without committing.</strong> Drop files here (matched by filename) " +
    "or use the Upload button on any tile. Images are stored in this browser only — no builds triggered.";

  const controls = document.createElement("div");
  controls.className = "upload-bar-controls";

  const bulkInput = document.createElement("input");
  bulkInput.type = "file";
  bulkInput.accept = "image/*";
  bulkInput.multiple = true;
  bulkInput.hidden = true;

  const pickBtn = document.createElement("button");
  pickBtn.type = "button";
  pickBtn.className = "tile-btn";
  pickBtn.textContent = "Pick files…";
  pickBtn.addEventListener("click", () => bulkInput.click());

  bulkInput.addEventListener("change", async () => {
    await handleBulkFiles([...bulkInput.files]);
    bulkInput.value = "";
  });

  controls.append(bulkInput, pickBtn);
  bar.append(info, controls);

  bar.addEventListener("dragover", (event) => {
    if (event.dataTransfer?.types?.includes("Files")) {
      event.preventDefault();
      bar.classList.add("drag-over");
    }
  });
  bar.addEventListener("dragleave", () => bar.classList.remove("drag-over"));
  bar.addEventListener("drop", async (event) => {
    event.preventDefault();
    bar.classList.remove("drag-over");
    await handleBulkFiles([...(event.dataTransfer?.files || [])]);
  });

  return bar;
};

const handleBulkFiles = async (files) => {
  const exact = [];
  const fuzzy = [];
  const unmatched = [];
  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;
    const asset = findAssetByFilename(file.name);
    if (!asset) {
      unmatched.push(file.name);
      continue;
    }
    await storeUpload(asset.file, file);
    tileHandlers.get(asset.file)?.refresh();
    if (file.name === asset.file) {
      exact.push(file.name);
    } else {
      fuzzy.push(`${file.name} → ${asset.file}`);
    }
  }

  if (exact.length || fuzzy.length || unmatched.length) {
    const parts = [];
    const matchedCount = exact.length + fuzzy.length;
    if (matchedCount) parts.push(`${matchedCount} matched and stored.`);
    if (fuzzy.length) {
      parts.push(`Fuzzy-matched (close filename):\n - ${fuzzy.join("\n - ")}`);
    }
    if (unmatched.length) {
      parts.push(
        `${unmatched.length} didn't match any expected filename:\n - ${unmatched.join("\n - ")}`
      );
    }
    alert(parts.join("\n\n"));
  }
};

// ---------------------------------------------------------------------------
// Sidebar badge: show count + clear-all
// ---------------------------------------------------------------------------
const uploadBadge = document.createElement("div");
uploadBadge.className = "upload-badge";
uploadBadge.hidden = true;

const updateUploadBadge = async () => {
  const keys = await idbAllKeys();
  if (!keys.length) {
    uploadBadge.hidden = true;
    uploadBadge.replaceChildren();
    return;
  }
  uploadBadge.hidden = false;
  uploadBadge.replaceChildren();

  const line = document.createElement("p");
  line.textContent = `${keys.length} sign${keys.length === 1 ? "" : "s"} stored locally`;

  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "tile-btn tile-btn-remove";
  clearBtn.textContent = "Clear all";
  clearBtn.addEventListener("click", async () => {
    if (!confirm("Remove all locally uploaded signs? This only clears your browser — nothing in the repo changes.")) {
      return;
    }
    const all = await idbAllKeys();
    for (const key of all) {
      await removeUpload(key);
      tileHandlers.get(key)?.refresh();
    }
  });

  uploadBadge.append(line, clearBtn);
};

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------
const renderModalAsset = async (asset) => {
  modalTitle.textContent = asset.name;
  modalPreview.replaceChildren(createPlaceholder("Loading..."));

  const localUrl = await loadUpload(asset.file);
  const fullImage = new Image();
  fullImage.alt = asset.name;

  fullImage.addEventListener("error", () => {
    modalPreview.replaceChildren(createPlaceholder(`Missing image: ${assetRoot}${asset.file}`));
  });

  fullImage.addEventListener("load", () => {
    modalPreview.replaceChildren(fullImage);
  });

  fullImage.src = localUrl || `${assetRoot}${asset.file}`;
};

const updateModalNavigation = () => {
  const atStart = activeAssetIndex <= 0;
  const atEnd = activeAssetIndex >= allAssets.length - 1;
  modalPrev.disabled = atStart;
  modalNext.disabled = atEnd;
};

const openModalByIndex = (index) => {
  activeAssetIndex = index;
  renderModalAsset(allAssets[activeAssetIndex]);
  updateModalNavigation();

  modal.hidden = false;
  document.body.style.overflow = "hidden";
};

const openModal = (asset) => {
  const nextIndex = allAssets.findIndex((item) => item.file === asset.file);
  if (nextIndex === -1) return;
  openModalByIndex(nextIndex);
};

const stepModalAsset = (step) => {
  const nextIndex = activeAssetIndex + step;
  if (nextIndex < 0 || nextIndex >= allAssets.length) return;
  openModalByIndex(nextIndex);
};

const closeModal = () => {
  modal.hidden = true;
  document.body.style.overflow = "";
  activeAssetIndex = -1;
};

const setupActiveNavigation = () => {
  const links = [...document.querySelectorAll(".nav-link")];
  const map = new Map(links.map((link) => [link.dataset.target, link]));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => link.classList.remove("active"));
          map.get(entry.target.id)?.classList.add("active");
        }
      });
    },
    { rootMargin: "-25% 0px -65% 0px", threshold: 0.1 }
  );

  document.querySelectorAll(".section").forEach((section) => observer.observe(section));
};

modalClose.addEventListener("click", closeModal);
modalPrev.addEventListener("click", () => stepModalAsset(-1));
modalNext.addEventListener("click", () => stepModalAsset(1));
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (modal.hidden) return;
  if (event.key === "Escape") return closeModal();
  if (event.key === "ArrowLeft") stepModalAsset(-1);
  if (event.key === "ArrowRight") stepModalAsset(1);
});

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
contentRoot.append(buildUploadBar());
buildNav();
setupActiveNavigation();

// Mount the sidebar badge + load current count
document.querySelector(".sidebar").append(uploadBadge);
updateUploadBadge();
